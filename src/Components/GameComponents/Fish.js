import React, { useMemo, useRef, useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { Canvas, extend, useFrame, useThree } from "react-three-fiber"
import { Html } from 'drei';
import '../../App.css'
import Clownfish from '../../Sprites/clownfish.gif'
import * as THREE from 'three';
 
 
function Fish({ pointCount }) {
 
//  const dummy = new THREE.Object3D();
var fishObj = {};
for (let i = 0; i < 50; i++) {
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

let fn = ((state) => {
  let fishObj = {};
for (let i = 0; i < pointCount; i++) {
  fishObj[i] = {x: Math.random() * 50, y: Math.random() * 50};
}

  setPosition(fishObj)
})

return (
  <>

  {
    Object.keys(fish).map(key => 
    // <Html><div>x: {fish[key].x},y: {fish[key].y} </div></Html>
  //   <Html visible userData={{ test: "hello" }} position={[fish[key].x, fish[key].y, 0]} castShadow>
  //   <sphereGeometry attach="geometry" args={[1, 16, 16]} />
  //   <meshStandardMaterial
  //     attach="material"
  //     color="white"
  //     transparent
  //     roughness={0.1}
  //     metalness={0.1}
  //   />
  // </Html>
  <mesh visible userData={{ test: "hello" }} position={[fish[key].x, fish[key].y, 0]} castShadow>
  <sphereGeometry attach="geometry" args={[1, 16, 16]} />
  <meshStandardMaterial
    attach="material"
    color="white"
    transparent
    roughness={0.1}
    metalness={0.1}
  />
</mesh>


    )
  }
  <Html>
  <button onClick ={fn}> hi</button>
  </Html>
  </>
)






//  var refsList = []
//  for (let i = 0; i < pointCount; i++) {
//    refsList.push(React.createRef());
//  }
 
//  let refs = useRef(refsList);
//  useEffect(() => {
//    for (let i = 0; i < refs.current.length; i++) {
//      refs.current[i].current.position.x = Math.random() * 650;
//      refs.current[i].current.position.y = Math.random() * -10;
//    }
//  })
 
//  useFrame(() => {
//    refs.current.forEach((fish) => {
//      fish.current.position.x -= .2
//    })
//  })
 
 
 
//  return (
//    refs.current.map((el, i) => {
//      return (
//        <group ref={refs.current[i]}>
//      <Html key={i}>
//        <img style={{width:"60px"}} src={Clownfish} alt="clownfish"></img>
//      </Html>
//        </group>
//      )
//    })
//  )
}
 
export default Fish;
 

