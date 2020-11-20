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
  fishObj[i] = {x: Math.random() * 250, y: generateStartingPosition()};
}

const [fish, setPosition] = useState(fishObj);


useFrame(({mouse}) => {

  let fishObj = {};
  for (let i = 0; i < pointCount; i++) {
    fishObj[i] = {x: fish[i].x -  0.15, y: fish[i].y};
    if ((Math.abs(fishObj[i].x - (x+1)) < 1) && (Math.abs(fishObj[i].y - (y-12)) < 1)) {
      // document.addEventListener("mousedown", (e) => {
        fishObj[i].y = -1000;
        setScore(score+1);
      // })
    }
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

{/* <Score score={score}/> */}
<Html>
  <div style={{ marginLeft:'70vh', marginTop:'-50%' }}>
  <h1>SCORE:{score}</h1>
  </div>
  </Html>

  </>
)}
 
export default Fish;
