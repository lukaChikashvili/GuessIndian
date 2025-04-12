import { useGLTF } from '@react-three/drei'
import React from 'react'

const Experience = () => {
    const model = useGLTF('./glovo_backpack.glb');

  return (
   <>

   {/* Center bag */}
   <primitive object={model.scene.clone()} scale={3} rotation={[0, 3.5, 0]} position={[0, 0, 0]} />

{/* Left bag */}
<primitive object={model.scene.clone()} scale={3} rotation={[0, 3.5, 0]} position={[-3, 0, 0]} />

{/* Right bag */}
<primitive object={model.scene.clone()} scale={3} rotation={[0, 3.5, 0]} position={[3, 0, 0]} />
   
   </>
  )
}

export default Experience
