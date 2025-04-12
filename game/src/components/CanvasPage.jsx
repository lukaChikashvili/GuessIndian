import React from 'react'
import { OrbitControls } from '@react-three/drei'
 
const CanvasPage = () => {
  return (
  <>
  <OrbitControls makeDefault />
    <mesh>
        <boxGeometry />
        <meshStandardMaterial color = "red" />
    </mesh>
  </>
  )
}

export default CanvasPage
