import { Html, useGLTF } from '@react-three/drei'
import React, { useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import IndianModal from './IndianModal'
import GeoModal from './GeoModal'

const HoverBag = ({ position = [0, 0, 0], model, onSelect, index, driver }) => {
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
      onSelect(position, index, driver) 
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
  const targetPositionRef = useRef(null);
  const [georgiansFound, setGeorgiansFound] = useState(0)

  const [clickedBags, setClickedBags] = useState([false, false, false]);

  const [indianModal, setIndianModal] = useState(false);
  const [geoModal, setGeoModal] = useState(false);
  const [numberModal, setNumberModal] = useState(false);

  const [drivers, setDrivers] = useState([]);

  const shuffleDrivers = () => {
    const driverTypes = ['Georgian', 'Georgian', 'Indian']
    driverTypes.sort(() => Math.random() - 0.5) 
    setDrivers(driverTypes);
    
  }

  useEffect(() => {
    shuffleDrivers();
  }, [])

  const handleSelectBag = (bagPosition, index, driver) => {
    setClickedBags(prev => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  
    targetPositionRef.current = new THREE.Vector3(...bagPosition)
    setNumberModal(index + 1);
    console.log('Behind the bag is:', driver);
    
    if (driver === 'Indian') {
      setIndianModal(true);
    } else {
      setGeorgiansFound((prev) => {
        const newCount = prev + 1;
        if (newCount === 2) {
          setGeoModal(true);
        }
        return newCount;
      });
    }
  };

  const playAgain = () => {
    setGeorgiansFound(0);
    setIndianModal(false);
    setGeoModal(false);
    setNumberModal(false);
    setClickedBags([false, false, false]); 
    shuffleDrivers(); 
    targetPositionRef.current = null;

  }

  return (
    <>
      <HoverBag position={[-3, 0, 0]} model={model} onSelect={handleSelectBag} driver={drivers[0]} index={0} />
      { (
  <Html center>
    <div className="numbermodal">
      <h2>{numberModal}</h2>
    </div>
  </Html>
)}
      <HoverBag position={[0, 0, 0]} model={model} onSelect={handleSelectBag} index={1} driver={drivers[1]} />
      <HoverBag position={[3, 0, 0]} model={model} onSelect={handleSelectBag} index={2} driver={drivers[2]} />

      {indianModal && (
         <Html>
            <div className='indian'>
                <IndianModal />
            </div>
         </Html>
      )}

{geoModal && (
         <Html>
            <div className='georgian'>
                <GeoModal play={playAgain}/>
            </div>
         </Html>
      )}
    </>
  )
}

export default Experience
