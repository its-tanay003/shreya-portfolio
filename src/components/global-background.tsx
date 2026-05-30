"use client"

import React, { useRef, useMemo, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useMasterTheme } from "./master-theme"

// Custom Shader for the displaced Grid plane
const gridVertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Wave displacement using multiple sines/cosines for a noise-like fluid effect
    float wave = sin(pos.x * 0.15 + uTime) * cos(pos.y * 0.15 + uTime) * 1.5;
    wave += sin(pos.x * 0.3 - uTime * 1.5) * 0.5;
    pos.z += wave;
    
    // Repel vertices based on mouse pointer coordinate
    float dist = distance(pos.xy, uMouse * 30.0);
    if (dist < 15.0) {
      float force = (15.0 - dist) / 15.0;
      pos.z -= force * 4.0;
    }
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const gridFragmentShader = `
  varying vec2 vUv;
  uniform vec3 uColor;
  uniform float uOpacity;
  
  void main() {
    gl_FragColor = vec4(uColor, uOpacity);
  }
`

// Layer 1: GPU Particle Field
function ParticleField({ count = 3000, color = "#6C63FF" }) {
  const pointsRef = useRef<THREE.Points>(null)
  
  // Safe pristine blank buffer allocated during render, idempotent on count change
  const positions = useMemo(() => new Float32Array(count * 3), [count])
  
  // Mutable ref for particle speeds, populated only in useEffect
  const speedsRef = useRef<Float32Array | null>(null)

  // Populate coordinates inside useEffect cleanly by accessing WebGL buffer directly
  useEffect(() => {
    if (pointsRef.current) {
      const posArr = pointsRef.current.geometry.attributes.position.array as Float32Array
      const speeds = new Float32Array(count)
      for (let i = 0; i < count; i++) {
        posArr[i * 3] = (Math.random() - 0.5) * 60
        posArr[i * 3 + 1] = (Math.random() - 0.5) * 60
        posArr[i * 3 + 2] = (Math.random() - 0.5) * 30
        speeds[i] = Math.random() * 0.5 + 0.1
      }
      speedsRef.current = speeds
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  }, [count])

  const pointsMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      color: new THREE.Color(color),
      size: 0.12,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  }, [color])

  useFrame((state) => {
    if (pointsRef.current && speedsRef.current) {
      const time = state.clock.elapsedTime
      const posArr = pointsRef.current.geometry.attributes.position.array as Float32Array
      const speeds = speedsRef.current
      
      for (let i = 0; i < count; i++) {
        // Individual sinusoidal drift
        const idx = i * 3
        posArr[idx + 1] += Math.sin(time + i * 0.1) * 0.005 * speeds[i]
        
        // Boundaries reset
        if (posArr[idx + 1] > 30) posArr[idx + 1] = -30
        if (posArr[idx + 1] < -30) posArr[idx + 1] = 30
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true
      pointsRef.current.rotation.y = time * 0.02
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <primitive object={pointsMaterial} />
    </points>
  )
}

// Layer 2: Magnetic displaced wireframe grid
function MagneticGrid({ color = "#00F5FF", opacity = 0.08 }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const mouse = useRef(new THREE.Vector2(0, 0))

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uColor: { value: new THREE.Color(color) },
    uOpacity: { value: opacity }
  }), [color, opacity])

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
      materialRef.current.uniforms.uMouse.value.lerp(mouse.current, 0.08)
    }
    if (meshRef.current) {
      // Parallax rotation
      meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, mouse.current.x * 0.05, 0.05)
    }
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.3, 0, 0]} position={[0, -8, -5]}>
      <planeGeometry args={[80, 80, 50, 50]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={gridVertexShader}
        fragmentShader={gridFragmentShader}
        uniforms={uniforms}
        wireframe={true}
        transparent={true}
      />
    </mesh>
  )
}

// Layer 3: Floating 3D Geometric Bodies
function FloatingGeometries({ primaryColor = "#6C63FF", secondaryColor = "#00F5FF" }) {
  const groupRef = useRef<THREE.Group>(null)
  const mouse = useRef(new THREE.Vector2(0, 0))
  const idleTimer = useRef(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
      idleTimer.current = 0 // Reset idle timer on interaction
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Floating geometries references
  const mesh1 = useRef<THREE.Mesh>(null)
  const mesh2 = useRef<THREE.Mesh>(null)
  const mesh3 = useRef<THREE.Mesh>(null)

  // Primary Color material for shapes 1 and 3
  const primaryMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#FAF8FF"),
      emissive: new THREE.Color(primaryColor),
      emissiveIntensity: 0.15,
      roughness: 0.1,
      metalness: 0.8,
      transmission: 0.45,
      thickness: 1,
      transparent: true,
      wireframe: true,
      clearcoat: 0.8,
    })
  }, [primaryColor])

  // Secondary Color material for shape 2
  const secondaryMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#FAF8FF"),
      emissive: new THREE.Color(secondaryColor),
      emissiveIntensity: 0.15,
      roughness: 0.1,
      metalness: 0.8,
      transmission: 0.45,
      thickness: 1,
      transparent: true,
      wireframe: true,
      clearcoat: 0.8,
    })
  }, [secondaryColor])

  useFrame((state) => {
    const time = state.clock.elapsedTime
    const delta = state.clock.getDelta()

    // 3D Parallax camera response
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.current.x * 0.15, 0.05)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.current.y * 0.15, 0.05)
      
      // Floating motion
      groupRef.current.position.y = Math.sin(time * 0.6) * 0.25
    }

    // Individual rotations
    if (mesh1.current) {
      mesh1.current.rotation.x += 0.005
      mesh1.current.rotation.y += 0.007
    }
    if (mesh2.current) {
      mesh2.current.rotation.x -= 0.006
      mesh2.current.rotation.z += 0.005
    }
    if (mesh3.current) {
      mesh3.current.rotation.y += 0.008
      mesh3.current.rotation.z -= 0.004
    }

    // Idle Breathing logic (starts after 3 seconds of stillness)
    idleTimer.current += delta || 0.016
    if (idleTimer.current > 3.0 && groupRef.current) {
      const breathingPulse = 1.0 + Math.sin(time * 2.0) * 0.02
      groupRef.current.scale.set(breathingPulse, breathingPulse, breathingPulse)
      
      // Soft vibration trigger simulation
      if (Math.sin(time * 2.0) > 0.98 && "vibrate" in navigator) {
        navigator.vibrate(5)
      }
    } else if (groupRef.current) {
      groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
    }
  })

  return (
    <group ref={groupRef}>
      {/* Mesh 1: Torus Knot */}
      <mesh ref={mesh1} position={[-8, 3, -10]} material={primaryMaterial}>
        <torusKnotGeometry args={[1.5, 0.4, 64, 8]} />
      </mesh>
      
      {/* Mesh 2: Icosahedron */}
      <mesh ref={mesh2} position={[8, -2, -8]} material={secondaryMaterial}>
        <icosahedronGeometry args={[2, 0]} />
      </mesh>
      
      {/* Mesh 3: Octahedron */}
      <mesh ref={mesh3} position={[0, 4, -12]} material={primaryMaterial}>
        <octahedronGeometry args={[1.8, 0]} />
      </mesh>
    </group>
  )
}

export function GlobalBackground() {
  const { theme } = useMasterTheme()

  const primaryColor = theme.palette.primary
  const secondaryColor = theme.palette.secondary

  return (
    <>
      {/* Layer 4: Aurora CSS conic gradient class (moved to globals.css) */}
      <div className="fixed inset-0 z-[-12] pointer-events-none opacity-[0.22] blur-[80px] aurora-bg" />

      {/* WebGL 3D Layer (Layers 1, 2, 3) */}
      <div className="fixed inset-0 z-[-10] pointer-events-none w-full h-full">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 60 }}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={1.2} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color={primaryColor} />
          <pointLight position={[-10, -10, -10]} intensity={1} color={secondaryColor} />
          
          <ParticleField count={2500} color={primaryColor} />
          <MagneticGrid color={secondaryColor} opacity={0.1} />
          <FloatingGeometries primaryColor={primaryColor} secondaryColor={secondaryColor} />
        </Canvas>
      </div>
    </>
  )
}
