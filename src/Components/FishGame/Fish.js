import React, { useState, useRef, useEffect, Suspense } from "react"
import { useFrame, useLoader } from "react-three-fiber"
import './index.css'
import Clownfish from '../../Sprites/clownfish.gif'
import * as THREE from 'three';
import {Html} from 'drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
 
 
function Fish({ pointCount, x, y }) {

  const { scene } = useLoader(GLTFLoader, '/models/largerfish.glb')
  const shark = useLoader(GLTFLoader, '/models/shark.glb')
  const hybopsis = useLoader(GLTFLoader, '/models/another.glb')


  const fish_ = useLoader(GLTFLoader, '/models/shark.glb')


  const [score, setScore] = useState(0)

function generateStartingPosition() {
  var startingPoint = Math.random();
  var multiplier = Math.random();
  if (multiplier >= 0.5) {return startingPoint * 15};
  return startingPoint * (-15)
}

function getFishType(index) {
  if (index % 2 == 0) {
    return scene
  }

  if (index % 5 == 0) {
    return shark
  }

  else {return hybopsis}
}

function getGeometry(type) {
  if (type === scene) {
    return type.children[2].geometry
  }

  else if (type === hybopsis) {
    console.log(type)
    return type.scene.children[2].children[1].geometry
  }

  else {
    return type.scene.children[2].children[0].geometry
  }
}

function getMaterial(type) {
  if (type === scene) {
    return type.children[2].material
  }

  else if (type === hybopsis) {
    return type.scene.children[2].children[1].material
  }

  else {
    return type.scene.children[2].children[0].material;
  }
}

function scaleFactor(type) {
  if (type === scene) {
    return [3,3,3]
  }

  else {
    return [0.5,0.5,0.5]
  }
}

function rotationFactor(type) {
  if (type === scene) {
    return [-199, 0, null]
  }
  else {
    return [1.7, null, 1.3]
  }
}

var fishObj = {};

for (let i = 0; i < pointCount; i++) {
  fishObj[i] = {
    x: Math.random() * 400, 
    y: generateStartingPosition(), 
    speed: Math.abs(Math.cos(i)) / 3, 
    type: getFishType(i),
    geometry: getGeometry(getFishType(i)),
    material: getMaterial(getFishType(i)),
    scaleFactor: scaleFactor(getFishType(i)),
    rotationFactor: rotationFactor(getFishType(i))
  }
    
}

const [fish, setPosition] = useState(fishObj);


useFrame(({mouse}) => {

  let fishObj_ = {};
  for (let i = 0; i < pointCount; i++) {
    let speed = fishObj[i].speed;
    let type = fishObj[i].type
    let geometry = fishObj[i].geometry
    let material = fishObj[i].material
    let scaleFactor = fishObj[i].scaleFactor
    let rotationFactor = fishObj[i].rotationFactor
    fishObj_[i] = {x: fish[i].x -  speed, y: fish[i].y, speed: speed, type: type, geometry: geometry, material: material, scaleFactor: scaleFactor, rotationFactor: rotationFactor};
    if ((Math.abs(fishObj_[i].x - (x)) < 2.25) && (Math.abs(fishObj_[i].y - (y)) < 2.25)) {
        fishObj_[i].y = -1000;
        setScore(score+1);
    }
  }
    setPosition(fishObj_)
})


return (

  <>
  <Suspense fallback={null}>
  {
    Object.keys(fish).map(key =>

      <mesh visible
      rotation={fish[key].rotationFactor}
      position={[fish[key].x, fish[key].y, 0]}
      geometry={fish[key].geometry}
      material={fish[key].material}
      scale={fish[key].scaleFactor}
      >
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
