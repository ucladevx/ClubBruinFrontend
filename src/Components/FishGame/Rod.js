import React, { useRef, useEffect, Suspense, useState } from "react"
import { Canvas, useFrame, useLoader } from "react-three-fiber"
import { Html } from 'drei';
import './index.css'
import Fish from './Fish'
import * as THREE from 'three';
import hookNoLine from '../../Sprites/hookNoLine.png'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


function Rod({history}) {

  // const limits = window.screen.width / 65

  const hook = useLoader(GLTFLoader, '/models/hook_.glb');
  // console.log(hook.scene.children[2])
  const line = useLoader(GLTFLoader, '/models/line.glb');
  // console.log(line.scene.children[2])

  var limits
  const size = window.screen.width;

  var lim = (window.screen.width / window.screen.height) * 15;

    const [xPos, setxPos] = useState(0);
    const [yPos, setyPos] = useState(0)

    useFrame(({mouse}) => {
      // console.log(xPos + ": x " + yPos + ": y")
      if (xPos + mouse.x <= lim && xPos + mouse.x >= -lim && yPos >= 12) {setxPos(xPos + (mouse.x / 4))};
      if (yPos + mouse.y <= 13 && yPos + mouse.y >= -15) {setyPos(yPos + (mouse.y / 4))}
    })


    // temporarily using the hook without the rod
    const texture = useLoader(THREE.TextureLoader, hookNoLine)

    return (
        <>
        <Fish x={xPos} y={yPos} pointCount={40} history = {history}/>

        <mesh
          position={[xPos,yPos,1]}
          geometry={hook.scene.children[2].geometry}
          material={hook.scene.children[2].material}
          scale={[2,2,2]}
        >
        </mesh>


        <mesh
         position={[xPos, yPos+18.5, 1]}
         scale={[.35,1,1]}
         >
      <boxGeometry args={[0.2, 30, 0]}/>
      <meshStandardMaterial attach="material" color='white'/>
    </mesh>

    </>
      )
}

export default Rod; 
