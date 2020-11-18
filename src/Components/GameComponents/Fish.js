import React, { useState, useRef, useEffect, Suspense } from "react"
import { useFrame, useLoader } from "react-three-fiber"
import '../../App.css'
import Clownfish from '../../Sprites/clownfish.gif'
import * as THREE from 'three';
import {Html} from 'drei'
import Bear from '../../Sprites/walk1.png'
import Rod from './Rod'
import Hook from '../../Sprites/hook.png'
 
 
function Fish({ pointCount, x, y }) {

var fishObj = {};

for (let i = 0; i < pointCount; i++) {
  fishObj[i] = {x: Math.random() * 50, y: Math.random() * 50};
}

const [fish, setPosition] = useState(fishObj);


useFrame(({mouse}) => {

  let fishObj = {};
  for (let i = 0; i < pointCount; i++) {
    fishObj[i] = {x: fish[i].x -  0.1, y: fish[i].y};
    if ((fishObj[i].x - (x) < 0.1) && (fishObj[i].y - (y-1) < 0.1)) {
      document.addEventListener("mousedown", (e) => {if (e.which === 1) {(fishObj[i].x = 1000)}})}
      // (fishObj[i].x = 1000)}
  }
    setPosition(fishObj)
})

const texture = useLoader(THREE.TextureLoader, Bear)
return (
  <>
  <Suspense fallback={null}>
  {
    Object.keys(fish).map(key => 
  <mesh position={[fish[key].x, fish[key].y, 0]}>
      <planeBufferGeometry attach="geometry" args={[2, 2]} />
      <meshBasicMaterial attach="material" map={texture} toneMapped={false} />
  </mesh>

    )
  }
  </Suspense>

  </>
)}
 
export default Fish;
