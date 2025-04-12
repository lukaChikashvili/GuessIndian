import { Html, useGLTF } from '@react-three/drei'
import React, { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const HoverBag = ({ position = [0, 0, 0], model, onSelect, index }) => {
  const ref = useRef()
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  useFrame(() => {
    if (ref.current) {
      const targetY = hovered ? 0.3 : 0
      ref.current.position.y += (targetY - ref.current.position.y) * 0.1
    }
  })

  const handlePlaneClick = () => {
    setClicked(true)
    onSelect(position, index) 
  }

  return (
    <group position={position}>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1, 0]}
        receiveShadow
        onClick={handlePlaneClick}
      >
        <planeGeometry args={[1.5, 1.5]} />
        <meshStandardMaterial color={clicked ? '#169976' : 'gray'} />
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
  const { camera } = useThree()
  const targetPositionRef = useRef(null);

  const [numberModal, setNumberModal] = useState(false);

  useFrame(() => {
    if (targetPositionRef.current) {
      const target = targetPositionRef.current.clone().add(new THREE.Vector3(0, 1, 5))
      camera.position.lerp(target, 0.019)
      camera.lookAt(targetPositionRef.current)
    }
  })

  const handleSelectBag = (bagPosition, index) => {
    targetPositionRef.current = new THREE.Vector3(...bagPosition)
    setNumberModal(index + 1);
  }

  return (
    <>
      <HoverBag position={[-3, 0, 0]} model={model} onSelect={handleSelectBag} index={0} />
      { (
  <Html center>
    <div className="numbermodal">
      <h2>{numberModal}</h2>
    </div>
  </Html>
)}
      <HoverBag position={[0, 0, 0]} model={model} onSelect={handleSelectBag} index={1} />
      <HoverBag position={[3, 0, 0]} model={model} onSelect={handleSelectBag} index={2} />
    </>
  )
}

export default Experience
