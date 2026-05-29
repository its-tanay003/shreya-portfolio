"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

const vertexShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uPointer;
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Slight displacement based on pointer proximity and time
    float dist = distance(uv, uPointer);
    float ripple = sin(dist * 10.0 - uTime * 2.0) * exp(-dist * 5.0);
    pos.z += ripple * 0.2;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uPointer;
  
  void main() {
    // Colors matching the "Luxury Creative Studio meets Sci-Fi Editorial" theme
    vec3 color1 = vec3(0.0, 0.05, 0.15); // Deep Cosmic Navy
    vec3 color2 = vec3(1.0, 0.43, 0.71); // Bubblegum Pink (#FF6EB4)
    vec3 color3 = vec3(0.0, 0.9, 0.75);  // Mint (#00E5C0)
    vec3 color4 = vec3(0.9, 0.9, 0.98);  // Lavender / Silver
    
    // Complex noise-like mixing
    float mix1 = sin(vUv.x * 4.0 + uTime * 0.5) * 0.5 + 0.5;
    float mix2 = cos(vUv.y * 3.0 - uTime * 0.3) * 0.5 + 0.5;
    
    // Add pointer interaction
    float dist = distance(vUv, uPointer);
    float glow = exp(-dist * 3.0);
    
    vec3 baseColor = mix(color1, color2, mix1 * mix2);
    baseColor = mix(baseColor, color3, sin(vUv.x * 2.0 + vUv.y * 2.0 + uTime) * 0.3 + 0.3);
    
    // Add interaction glow and a dark base
    vec3 finalColor = mix(baseColor, color4, glow * 0.4);
    
    // Darken overall to keep it as a background
    finalColor *= 0.35;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function FluidMesh() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uPointer: { value: new THREE.Vector2(0.5, 0.5) },
  }), [])

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
      
      // Smoothly interpolate pointer position
      // Map pointer from [-1, 1] to [0, 1] for UV coordinates
      const targetX = (state.pointer.x * 0.5) + 0.5
      const targetY = (state.pointer.y * 0.5) + 0.5
      
      materialRef.current.uniforms.uPointer.value.lerp(
        new THREE.Vector2(targetX, targetY),
        0.05
      )
    }
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[10, 10, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  )
}

export function GlobalBackground() {
  return (
    <div className="fixed inset-0 z-[-10] pointer-events-none opacity-80 mix-blend-screen dark:mix-blend-normal">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        gl={{ alpha: false, antialias: true }}
        dpr={[1, 2]}
      >
        <FluidMesh />
      </Canvas>
    </div>
  )
}
