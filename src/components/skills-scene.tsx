"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Text, OrbitControls } from "@react-three/drei"
import { useRef } from "react"
import * as THREE from "three"

const tools = [
  { name: "Illustrator", color: "#FF9A00" },
  { name: "Photoshop", color: "#31A8FF" },
  { name: "InDesign", color: "#FF3366" },
  { name: "Figma", color: "#0acf83" },
  { name: "Blender", color: "#ea7600" }
]

function Planet({ tool, radius, speed, index }: { tool: { name: string, color: string }, radius: number, speed: number, index: number }) {
  const planetRef = useRef<THREE.Group>(null)
  const offset = (index * Math.PI * 2) / 5

  useFrame((state) => {
    if (planetRef.current) {
      const angle = (state.clock.elapsedTime * speed) + offset
      planetRef.current.position.x = Math.cos(angle) * radius
      planetRef.current.position.z = Math.sin(angle) * radius
      planetRef.current.rotation.y += 0.02
    }
  })

  return (
    <group ref={planetRef}>
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color={tool.color} roughness={0.4} metalness={0.2} />
      </mesh>
      <Text position={[0, -0.6, 0]} fontSize={0.2} color={tool.color}>
        {tool.name}
      </Text>
    </group>
  )
}

function SolarSystem() {
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={group}>
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 10]} intensity={2} />
      
      {/* Center Sun (Shreya) */}
      <Text position={[0, 0, 0]} fontSize={0.6} color="#FAF8FF" outlineWidth={0.02} outlineColor="#FF6EB4">
        S.S
      </Text>
      
      {/* Orbital Rings */}
      {tools.map((_, i) => {
        const radius = 2 + i * 1.2
        return (
          <mesh key={`ring-${i}`} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius - 0.02, radius + 0.02, 64]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.1} side={THREE.DoubleSide} />
          </mesh>
        )
      })}

      {/* Planets */}
      {tools.map((tool, i) => {
        const radius = 2 + i * 1.2
        const speed = 0.5 - i * 0.05
        return (
          <Planet key={tool.name} tool={tool} radius={radius} speed={speed} index={i} />
        )
      })}
    </group>
  )
}

export function SkillsScene() {
  return (
    <Canvas camera={{ position: [0, 5, 12], fov: 45 }}>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      <SolarSystem />
    </Canvas>
  )
}
