import React, { useRef, useEffect, Suspense, useState } from "react"
import { Canvas, useFrame, useLoader } from "react-three-fiber"
import { Html } from 'drei';
import '../../App.css'
import Hook from '../../Sprites/hook.png'
import Fish from './Fish'
import * as THREE from 'three';

function Rod() {

    const [xPos, setxPos] = useState(0);
    const [yPos, setyPos] = useState(0)

    useFrame(({mouse}) => {
        setxPos(xPos + (mouse.x / 2))
        setyPos(yPos + (mouse.y / 2))
    })


    const texture = useLoader(THREE.TextureLoader, Hook)

    return (
        <>
        <Suspense fallback={null}>
        <Fish x={xPos} y={yPos} pointCount={50}/>
        </Suspense>
        <mesh position={[xPos,yPos,0]}>
      <planeBufferGeometry attach="geometry" args={[3, 30]} />
      <meshBasicMaterial attach="material" map={texture} toneMapped={false} />
        </mesh>
    </>
      )
}

export default Rod; 
