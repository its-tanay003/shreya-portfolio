"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import * as THREE from "three"

const fragmentShader = `
uniform float uTime;
uniform vec2 uResolution;
varying vec2 vUv;

// Classic Perlin 3D Noise 
// by Stefan Gustavson
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float snoise(vec3 v){ 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  // First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;

  // Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //  x0 = x0 - 0.0 + 0.0 * C 
  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

  // Permutations
  i = mod(i, 289.0 ); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  // Gradients
  // ( N*N points uniformly over a square, mapped onto an octahedron.)
  float n_ = 1.0/7.0; // N=7
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  //Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  // Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
}

void main() {
  vec2 uv = vUv;
  
  // Create flowing noise
  float noise1 = snoise(vec3(uv.x * 2.0, uv.y * 2.0, uTime * 0.1));
  float noise2 = snoise(vec3(uv.x * 3.0 - uTime * 0.1, uv.y * 3.0 + uTime * 0.05, uTime * 0.2));
  
  float n = (noise1 + noise2) * 0.5;
  
  // Color Palette: Pink (#FF6EB4), Mint (#00E5C0), Lavender (#F5E6FF), Navy (#1A1A2E)
  vec3 col1 = vec3(1.0, 0.43, 0.70); // Pink
  vec3 col2 = vec3(0.0, 0.89, 0.75); // Mint
  vec3 col3 = vec3(0.96, 0.90, 1.0); // Lavender
  vec3 col4 = vec3(0.10, 0.10, 0.18); // Navy
  
  vec3 finalColor = mix(col4, col1, smoothstep(-1.0, 0.0, n));
  finalColor = mix(finalColor, col2, smoothstep(0.0, 0.5, n));
  finalColor = mix(finalColor, col3, smoothstep(0.5, 1.0, n));
  
  gl_FragColor = vec4(finalColor, 1.0);
}
`

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

function AuroraBackground() {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2() }
  }), [])

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh scale={[100, 100, 1]} position={[0, 0, -10]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  )
}

function FloatingObjects() {
  const groupRef = useRef<THREE.Group>(null)
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      // Lerp smoothing for mouse parallax
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouse.current.y * 0.5, 0.05)
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.current.x * 0.5, 0.05)
      
      // Idle floating
      const t = state.clock.elapsedTime
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 10]} intensity={2} color="#F5E6FF" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#00E5C0" />
      
      {/* Abstract Lens */}
      <mesh position={[2, 1, 0]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <cylinderGeometry args={[1, 0.8, 0.5, 32]} />
        <meshPhysicalMaterial 
          color="#1A1A2E"
          metalness={0.9}
          roughness={0.1}
          clearcoat={1}
          transmission={0.5}
        />
      </mesh>

      {/* Abstract Palette */}
      <mesh position={[-3, -1, -2]} rotation={[-Math.PI / 6, Math.PI / 3, 0]}>
        <torusGeometry args={[1.5, 0.2, 16, 100]} />
        <meshPhysicalMaterial 
          color="#FFD166"
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>

      {/* Abstract Brush Stroke (Tube) */}
      <mesh position={[1, -2, 1]} rotation={[0, 0, Math.PI / 4]}>
        <capsuleGeometry args={[0.2, 2, 4, 16]} />
        <meshPhysicalMaterial 
          color="#FF6EB4"
          transmission={0.9}
          thickness={1}
          roughness={0}
        />
      </mesh>
    </group>
  )
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <AuroraBackground />
        <FloatingObjects />
      </Canvas>
    </div>
  )
}

import { useEffect } from "react"
