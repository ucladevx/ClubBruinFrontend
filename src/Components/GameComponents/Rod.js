import React, { useRef, useEffect, Suspense, useState } from "react"
import { Canvas, useFrame, useLoader } from "react-three-fiber"
import { Html } from 'drei';
import '../../App.css'
import Hook from '../../Sprites/hook.png'
import Fish from './Fish'
import * as THREE from 'three';
import HookNoRod from '../../Sprites/justhook.png'

function Rod() {

    const [xPos, setxPos] = useState(0);
    const [yPos, setyPos] = useState(0)

    useFrame(({mouse}) => {
      if (xPos + mouse.x <= 30 && xPos + mouse.x >= -30) {setxPos(xPos + (mouse.x / 2))};
        setyPos(yPos + (mouse.y / 2))
    })


    // temporarily using the hook without the rod
    const texture = useLoader(THREE.TextureLoader, HookNoRod)

    return (
        <>
        <Suspense fallback={null}>
        <Fish x={xPos} y={yPos} pointCount={30}/>
        </Suspense>
        <mesh position={[xPos,yPos,0]}>
      <planeBufferGeometry attach="geometry" args={[1.5, 7]} />
      <meshBasicMaterial attach="material" map={texture} toneMapped={false} />
        </mesh>
    </>
      )
}

export default Rod; 
