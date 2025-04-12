import { useGLTF } from '@react-three/drei'
import React, { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

const HoverBag = ({ position = [0, 0, 0], model }) => {
  const ref = useRef()
  const [hovered, setHovered] = useState(false)

  
  useFrame(() => {
    if (ref.current) {
      const targetY = hovered ? 0.3 : 0
      ref.current.position.y += (targetY - ref.current.position.y) * 0.1
    }
  })

  


  return (
    <group position={position}>
   
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1, 0]}
        receiveShadow
      >
        <planeGeometry args={[1.5, 1.5]} />
        <meshStandardMaterial color="gray" />
      </mesh>

    
      <group
        ref={ref}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <primitive object={model.scene.clone()} scale={3} rotation={[0, 3.5, 0]} />
      </group>
    </group>
  )
}

const Experience = () => {
  const model = useGLTF('./glovo_backpack.glb')

  return (
    <>
      <HoverBag position={[-3, 0, 0]} color="lime" model={model} />
      <HoverBag position={[0, 0, 0]} color="orange" model={model} />
      <HoverBag position={[3, 0, 0]} color="skyblue" model={model} />
    </>
  )
}

export default Experience
