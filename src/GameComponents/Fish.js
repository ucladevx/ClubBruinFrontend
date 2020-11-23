import React, { useState, useRef, useEffect, Suspense } from "react"
import { useFrame, useLoader } from "react-three-fiber"
import '../App.css'
import Clownfish from '../Sprites/clownfish.gif'
import * as THREE from 'three';
import {Html} from 'drei'
 
 
function Fish({ pointCount, x, y }) {

  const [score, setScore] = useState(0)

// on my screen (13.8 inch) the y positions range from around -15 to 15. Don't know how this translate across other screen sizes
function generateStartingPosition() {
  var startingPoint = Math.random();
  var multiplier = Math.random();
  if (multiplier >= 0.5) {return startingPoint * 15};
  return startingPoint * (-15)
}

var fishObj = {};

for (let i = 0; i < pointCount; i++) {
  fishObj[i] = {x: Math.random() * 400, y: generateStartingPosition()};
}

const [fish, setPosition] = useState(fishObj);


useFrame(({mouse}) => {

  let fishObj = {};
  for (let i = 0; i < pointCount; i++) {
    fishObj[i] = {x: fish[i].x -  0.25, y: fish[i].y};
    if ((Math.abs(fishObj[i].x - (x)) < 2.25) && (Math.abs(fishObj[i].y - (y)) < 2.25)) {
      // EVENT LISTENER COMMENTED OUT FOR NOW BECAUSE OF WEIRD BUGS
      // document.addEventListener("mousedown", (e) => {
        fishObj[i].y = -1000;
        setScore(score+1);
      // })
    }
  }
    setPosition(fishObj)
})


const texture = useLoader(THREE.TextureLoader, Clownfish)
return (
  <>
  <Suspense fallback={null}>
  {
    Object.keys(fish).map(key => 
  <mesh position={[fish[key].x, fish[key].y, 0]}>
      <planeBufferGeometry attach="geometry" args={[2.5, 1.75]} />
      <meshBasicMaterial attach="material" map={texture} toneMapped={false} />
  </mesh>

    )
  }
  </Suspense>

<Html>
  <div style={{ marginLeft:'70vh', marginTop:'-50%' }}>
  <h1>SCORE:{score}</h1>
  </div>
  </Html>

  </>
)}
 
export default Fish;
