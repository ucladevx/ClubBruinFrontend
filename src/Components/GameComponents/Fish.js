import React, { useMemo, useRef, useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { Canvas, extend, useFrame, useThree, useLoader } from "react-three-fiber"
import { Html } from 'drei';
import { HTML } from 'drei';
import '../../App.css'
import Clownfish from '../../Sprites/clownfish.gif'
import * as THREE from 'three';
import { ImageLoader } from "three";
import Bear from '../../Sprites/walk1.png'
import { useSpring, animated as anim } from 'react-spring/three'
 
 
function Fish({ pointCount }) {
 
//  const dummy = new THREE.Object3D();

// const texture = useLoader(THREE.TextureLoader, Bear);

var fishObj = {};

for (let i = 0; i < pointCount; i++) {
  fishObj[i] = {x: Math.random() * 50, y: Math.random() * 50};
}

const [fish, setPosition] = useState(fishObj);

// useEffect(() => {
//   for (let i = 0; i < pointCount; i++) {
//     fishObj[i] = {x: Math.random() * 50, y: Math.random() * 50};
//   }  
  
// })

// const [fish, setPosition] = useState(fishObj);
 

useFrame((state) => {
  let fishObj = {};
  for (let i = 0; i < pointCount; i++) {
    fishObj[i] = {x: fish[i].x -  0.1, y: fish[i].y};
  }
  
    setPosition(fishObj)
  
})


// const texture = new THREE.TextureLoader().load('../../Sprites/walk1.png');

const texture = useLoader(THREE.TextureLoader, Bear)
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
  <mesh position={[fish[key].x, fish[key].y, 0]}>
      <planeBufferGeometry attach="geometry" args={[2, 2]} />
      <meshBasicMaterial attach="material" map={texture} toneMapped={false} />
  </mesh>
//   <mesh visible userData={{ test: "hello" }} position={[fish[key].x, fish[key].y, 0]} castShadow>
//   <sphereGeometry attach="geometry" args={[1, 16, 16]} />
//   <meshStandardMaterial
//     attach="material"
//     color="white"
//     transparent
//     roughness={0.1}
//     metalness={0.1}
//   />
// </mesh>


    )
  }
  </>
)




// const texture = useMemo(() => {
//     const loader = new THREE.TextureLoader();
//     const fishie = loader.load(Bear);

// }, [Bear])


// const [texture] = useLoader(THREE.ImageLoader, [Bear]);

// const [texture1, texture2] = useLoader(THREE.ImageLoader, ['../../Sprites/walk1.png', '../../Sprites/walk1.png'])

return (
      <mesh>
      <planeBufferGeometry attach="geometry" args={[4, 4]} />
      <meshBasicMaterial attach="material" map={texture} toneMapped={false} />
    </mesh>
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
