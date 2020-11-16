import React, { useState } from "react"
import { useFrame, useLoader } from "react-three-fiber"
import '../../App.css'
import Clownfish from '../../Sprites/clownfish.gif'
import * as THREE from 'three';
import Bear from '../../Sprites/walk1.png'
 
 
function Fish({ pointCount }) {
 
var fishObj = {};

for (let i = 0; i < pointCount; i++) {
  fishObj[i] = {x: Math.random() * 50, y: Math.random() * 50};
}

const [fish, setPosition] = useState(fishObj);

 

useFrame((state) => {
  let fishObj = {};
  for (let i = 0; i < pointCount; i++) {
    fishObj[i] = {x: fish[i].x -  0.1, y: fish[i].y};
  }
    setPosition(fishObj)
})

const texture = useLoader(THREE.TextureLoader, Bear)
return (
  <>

  {
    Object.keys(fish).map(key => 
  <mesh position={[fish[key].x, fish[key].y, 0]}>
      <planeBufferGeometry attach="geometry" args={[2, 2]} />
      <meshBasicMaterial attach="material" map={texture} toneMapped={false} />
  </mesh>

    )
  }
  </>
)}
 
export default Fish;
