import React from 'react'
import { OrbitControls } from '@react-three/drei'
import Experience from './Experience'
 
const CanvasPage = () => {
  return (
  <>
  <OrbitControls makeDefault />
   <Experience />
  </>
  )
}

export default CanvasPage
