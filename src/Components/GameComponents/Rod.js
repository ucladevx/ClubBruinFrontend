import React, { useRef, useEffect, Suspense, useState } from "react"
import { Canvas, useFrame, useLoader } from "react-three-fiber"
import { Html } from 'drei';
import '../../App.css'
import Hook from '../../Sprites/hook.png'
import Fish from './Fish'
import * as THREE from 'three';
import HookNoRod from '../../Sprites/justhook.png'
import hookNoLine from '../../Sprites/hookNoLine.png'


function Rod() {

    const [xPos, setxPos] = useState(0);
    const [yPos, setyPos] = useState(0)

    // NOT SURE HOW THESE CONSTRAINTS TRANSFER ACROSS DIFFERENT SCREEN SIZES
    useFrame(({mouse}) => {
      // console.log(xPos + ": x " + yPos + ": y")
      if (xPos + mouse.x <= 30 && xPos + mouse.x >= -30 && yPos >= 12) {setxPos(xPos + (mouse.x / 4))};
      if (yPos + mouse.y <= 13 && yPos + mouse.y >= -15) {setyPos(yPos + (mouse.y / 4))}
    })


    // temporarily using the hook without the rod
    const texture = useLoader(THREE.TextureLoader, hookNoLine)

    return (
        <>
        <Fish x={xPos} y={yPos} pointCount={30}/>
        <mesh position={[xPos,yPos,1]}>
      <planeBufferGeometry attach="geometry" args={[2, 4.1]} />
      <meshBasicMaterial attach="material" map={texture} toneMapped={false} />
        </mesh>

        {/* ROD */}
        <mesh position={[xPos-.25, yPos+17, 1]}>
      {/* <sphereGeometry attach="geometry" args={[10, 10, 0]} /> */}
      <boxGeometry args={[0.2, 30, 0]}/>
      <meshStandardMaterial attach="material" color='black'/>
    </mesh>

    </>
      )
}

export default Rod; 
