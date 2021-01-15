


import React, { useRef, useEffect, Suspense, useState } from "react"
import { Canvas, useFrame, useLoader } from "react-three-fiber"
import { Html } from 'drei';
import './index.css'
import Fish from './Fish'
import * as THREE from 'three';
import hookNoLine from '../../Sprites/hookNoLine.png'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as Colyseus from "colyseus.js";

function Rod() {

  // const limits = window.screen.width / 65

  const hook = useLoader(GLTFLoader, '/models/hook_.glb');
  // console.log(hook.scene.children[2])
  const line = useLoader(GLTFLoader, '/models/line.glb');
  // console.log(line.scene.children[2])

  var limits
  const size = window.screen.width;

  var lim = (window.screen.width / window.screen.height) * 15;

  const [room, setRoomInstance] = useState();
  const [xPos, setxPos] = useState(0);
  const [yPos, setyPos] = useState(0)
  const [client, setClient] = useState();
  const [username, _] = useState('user' + Math.random() * 100);

  useEffect(async () => {
    let c = new Colyseus.Client("ws://localhost:9000")
    setClient(c);
    var room;
    c.joinOrCreate("fishing", {
      username: username
    }).then(room_instance => {
      setRoomInstance(room_instance);
    })

  })


  useFrame(({ mouse }) => {
    // console.log(xPos + ": x " + yPos + ": y")
    //if (room) {
      if (xPos + mouse.x <= lim && xPos + mouse.x >= -lim && yPos >= 12) {
        setxPos(xPos + (mouse.x / 4))
        room.send("moveRod", { x: (mouse.x / 4) })
      };
      if (yPos + mouse.y <= 13 && yPos + mouse.y >= -15) {
        setyPos(yPos + (mouse.y / 4))
        room.send("moveRod", { y: (mouse.y / 4) })
      }
   //}

  })




  // temporarily using the hook without the rod
  const texture = useLoader(THREE.TextureLoader, hookNoLine)

  return (
    <>
      <Fish x={xPos} y={yPos} pointCount={40} room={room} />

      <mesh
        position={[xPos, yPos, 1]}
        geometry={hook.scene.children[2].geometry}
        material={hook.scene.children[2].material}
        scale={[2, 2, 2]}
      >
      </mesh>


      <mesh
        position={[xPos, yPos + 18.5, 1]}
        scale={[.35, 1, 1]}
      >
        <boxGeometry args={[0.2, 30, 0]} />
        <meshStandardMaterial attach="material" color='white' />
      </mesh>

    </>
  )
}

export default Rod; 
