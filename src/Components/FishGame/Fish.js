import React, { useState, useRef, useEffect, Suspense } from "react"
import { useFrame, useLoader } from "react-three-fiber"
import './index.css'
import Clownfish from '../../Sprites/clownfish.gif'
import * as THREE from 'three';
import {Html} from 'drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import GameOverGraphic from '../../Sprites/gameover.png'
import {useHistory} from 'react-router-dom'
import { PlainAnimator } from "three-plain-animator/lib/plain-animator";
// import Nemo from '../../Sprites/Fish/nemo.gif'
// import NemoVid from '../../Sprites/Fish/nemo.mp4'
import GifLoader from 'three-gif-loader';
import Yellow from '../../Sprites/Fish/yellow.png'
import Grey from '../../Sprites/Fish/grey.png'
import Swordfish from '../../Sprites/Fish/swordfish.png'
import Angler from '../../Sprites/Fish/angler.png'
import Blue from '../../Sprites/Fish/blue.png'
import Hammerhead from '../../Sprites/Fish/hammerhead.png'
import Seahorse from '../../Sprites/Fish/seahorse.png'
 
function Fish({ pointCount, x, y, history }) {

  const sprtex = useLoader(THREE.TextureLoader, Yellow);
  const greyFish = useLoader(THREE.TextureLoader, Grey);
  const swordFish = useLoader(THREE.TextureLoader, Swordfish);
  const angler = useLoader(THREE.TextureLoader, Angler);
  const blue = useLoader(THREE.TextureLoader, Blue);
  const hammerhead = useLoader(THREE.TextureLoader, Hammerhead);
  const seahorse = useLoader(THREE.TextureLoader, Seahorse);

  const [animator] = useState(() => new PlainAnimator(sprtex, 4, 3, 16, 10))
  const [greyAnimator] = useState(() => new PlainAnimator(greyFish, 4, 3, 16, 10))
  const [swordFishAnimator] = useState(() => new PlainAnimator(swordFish, 4, 4, 16, 10))
  const [anglerAnimator] = useState(() => new PlainAnimator(angler, 4, 4, 16, 10))
  const [blueAnimator] = useState(() => new PlainAnimator(blue, 4, 3, 16, 10))
  const [hammerheadAnimator] = useState(() => new PlainAnimator(hammerhead, 4, 4, 16, 10))
  const [seahorseAnimator] = useState(() => new PlainAnimator(seahorse, 4, 4, 16, 10))

  const [gameOver, setGameOver] = useState([-100,0,0]);
  const [returnHome, setReturnHome] = useState([-100,0,0])

  const [score, setScore] = useState(0)

function generateStartingPosition() {
  var startingPoint = Math.random();
  var multiplier = Math.random();
  if (multiplier >= 0.5) {return startingPoint * 15};
  return startingPoint * (-15)
}


function getSpeed(index) {
  if (index >= 0 && index < 10) {
    return .35
  }
  else if (index >= 10 && index < 20) {
    return .45
  }

  else if (index >= 20 && index < 30) {
    return .25
  }

  else {
    return .4
  }

}


var fishObj = {};

for (let i = 0; i < pointCount; i++) {
  fishObj[i] = {
    x: Math.random() * 400, 
    y: generateStartingPosition(), 
    speed: getSpeed(i), 
  }
    
}

const [fish, setPosition] = useState(fishObj);


function getFish(key) {
  if (key >= 0 && key < 7) {
    return sprtex
  }
  else if (key >= 7 && key < 11) {
    return angler
  }
  else if (key >= 11 && key < 20) {
    return blue
  }
  else if (key >= 20 && key < 25) {
    return greyFish
  }
  else if (key >= 25 && key < 32) {
    return seahorse
  }
  else if (key >= 32 && key < 37) {
    return swordFish
  }
  else {
    return hammerhead 
  }
}

function getSize(key) {
  if (key >= 0 && key < 7) {
    return [5, 3, 0.1]
  }
  else if (key >= 7 && key < 11) {
    return [8, 5, 0.1]
  }
  else if (key >= 11 && key < 20) {
    return [5, 3, 0.1]
  }
  else if (key >= 20 && key < 25) {
    return [5, 3, 0.1]
  }
  else if (key >= 25 && key < 32) {
    return [3, 5, 0.1]
  }
  else if (key >= 32 && key < 37) {
    return [10, 3, 0.1]
  }
  else {
    return [13, 7, 0.1] 
  }
}

useFrame(({mouse}) => {

  animator.animate()
  greyAnimator.animate()
  swordFishAnimator.animate();
  anglerAnimator.animate();
  blueAnimator.animate()
  hammerheadAnimator.animate()
  seahorseAnimator.animate()

  let fishObj_ = {};
  let fishOffScreen = 0;

  for (let i = 0; i < pointCount; i++) {
    let speed = fishObj[i].speed;
    let type = fishObj[i].type
    let geometry = fishObj[i].geometry
    let material = fishObj[i].material
    let scaleFactor = fishObj[i].scaleFactor
    let rotationFactor = fishObj[i].rotationFactor;
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
  

      <mesh position={[fish[key].x, fish[key].y, 0]}>
      <planeBufferGeometry attach="geometry" args={getSize(key)} />
      <meshBasicMaterial attach="material" map={getFish(key)} toneMapped={false} transparent={true} />
      </mesh>


  
      )
    }
    </Suspense>

    <mesh position={gameOver}>
      <planeBufferGeometry attach="geometry" args={[25, 17.5]} />
      <meshBasicMaterial attach="material" map={gameOverGraphic} toneMapped={false} />
  </mesh>
  <Html position={returnHome}>
      <h1 style={{width:'1000px', cursor:'pointer'}} onClick={()=>{history.push('/map')}}>CLICK TO RETURN HOME</h1>
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
