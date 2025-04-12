
import './App.css'
import { Canvas } from '@react-three/fiber'
import CanvasPage from './components/CanvasPage'
import Lights from './components/Lights'

function App() {
    
   
  return (
    <>
      <Canvas>
         <CanvasPage />
         <Lights />
      </Canvas>
    </>
  )
}

export default App
