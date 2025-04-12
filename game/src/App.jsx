
import './App.css'
import { Canvas } from '@react-three/fiber'
import CanvasPage from './components/CanvasPage'
import Lights from './components/Lights'

function App() {
    
   
  return (
    <>
      <Canvas camera={{ position: [0, 3, 5], fov: 50 }}>
         <CanvasPage />
         <Lights />
      </Canvas>
    </>
  )
}

export default App
