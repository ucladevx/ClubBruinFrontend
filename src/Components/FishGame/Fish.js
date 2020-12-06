import React, { useState, useRef, useEffect, Suspense } from "react"
import { useFrame, useLoader } from "react-three-fiber"
import './index.css'
import Clownfish from '../../Sprites/clownfish.gif'
import * as THREE from 'three';
import {Html} from 'drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import GameOverGraphic from '../../Sprites/gameover.png'
 
 
function Fish({ pointCount, x, y }) {

  const { scene } = useLoader(GLTFLoader, '/models/largerfish.glb')
  const shark = useLoader(GLTFLoader, '/models/shark.glb')
  const hybopsis = useLoader(GLTFLoader, '/models/another.glb')

  const [gameOver, setGameOver] = useState([-100,0,0]);
  const [returnHome, setReturnHome] = useState([-100,0,0])

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

  else if (index % 5 == 0) {
    return shark
  }

  else {return hybopsis}
}

function getSpeed(type, index) {
  if (type === shark) {
    return .35;
  }
  else {
    return (Math.abs(Math.cos(index)) / 3) + .25;
  }
}

function getGeometry(type) {
  if (type === scene) {
    return type.children[2].geometry
  }

  else if (type === hybopsis) {
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
    return [1.7, null, 1.8]
  }
}

var fishObj = {};

for (let i = 0; i < pointCount; i++) {
  fishObj[i] = {
    x: Math.random() * 400, 
    y: generateStartingPosition(), 
    speed: getSpeed(getFishType(i), i), 
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
  let fishOffScreen = 0;

  for (let i = 0; i < pointCount; i++) {
    let speed = fishObj[i].speed;
    let type = fishObj[i].type
    let geometry = fishObj[i].geometry
    let material = fishObj[i].material
    let scaleFactor = fishObj[i].scaleFactor
    let rotationFactor = fishObj[i].rotationFactor;
    if (type === shark || type === hybopsis) {
      rotationFactor[2] -= .15
    }
    fishObj_[i] = {x: fish[i].x -  speed, y: fish[i].y, speed: speed, type: type, geometry: geometry, material: material, scaleFactor: scaleFactor, rotationFactor: rotationFactor};
    if ((Math.abs(fishObj_[i].x - (x)) < 2.25) && (Math.abs(fishObj_[i].y - (y)) < 2.25)) {
        fishObj_[i].y = -1000;
        setScore(score+1);
    }
    if (fishObj_[i].x < -30 || fishObj_[i].y === -1000) {
      fishOffScreen++;
    }
    if (fishOffScreen === pointCount) {
      setGameOver([0,0,0])
      setReturnHome([-6,-5,0])
    }
  }
    setPosition(fishObj_)
})

const gameOverGraphic = useLoader(THREE.TextureLoader, GameOverGraphic)


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

    <mesh position={gameOver}>
      <planeBufferGeometry attach="geometry" args={[25, 17.5]} />
      <meshBasicMaterial attach="material" map={gameOverGraphic} toneMapped={false} />
  </mesh>
  <Html position={returnHome}>
      <h1 style={{width:'1000px', cursor:'pointer'}} onClick={()=>{alert("BACK HOME")}}>CLICK TO RETURN HOME</h1>
  </Html>
  
  <Html>
    <div style={{ marginLeft:'70vh', marginTop:'-50%' }}>
    <h1>SCORE:{score}</h1>
    </div>
    </Html>
  
    </>
  )
  
}

 
export default Fish;
