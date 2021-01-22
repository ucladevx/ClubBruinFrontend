


import React, { useRef, useEffect, Suspense, useState } from "react"
import { Canvas, useFrame, useLoader } from "react-three-fiber"
import { Html } from 'drei';
import './index.css'
import Fish from './Fish'
import * as THREE from 'three';
import hookNoLine from '../../Sprites/hookNoLine.png'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as Colyseus from "colyseus.js";

function RodAlt() {

  // const limits = window.screen.width / 65

  const hook = useLoader(GLTFLoader, '/models/hook_.glb');
  const line = useLoader(GLTFLoader, '/models/line.glb');

  var limits
  const size = window.screen.width;

  var lim = (window.screen.width / window.screen.height) * 15;

  const [room, setRoomInstance] = useState();
  const [xPos, setxPos] = useState(0);
  const [yPos, setyPos] = useState(0);
  const [client, setClient] = useState();
  const [username, _] = useState('user' + Math.random() * 100);

  const [rodPositions, setRodPositions] = useState({});
  const [player, setPlayer] = useState({["name"]: {
    score : 0,
    x : 0,
    y : 0,
  }});

  


  useEffect(()=>{
    if (room) {
      console.log(" testing room");
      room.state.players.onAdd = function (player, sessionId) {
        console.log(player.score);
        console.log(player.rod.x);
        console.log(player.rod.y);

        setPlayer((p)=>({
          ...p,
          [player.username] : {
            score : player.score,
            x: player.rod.x,
            y: player.rod.y,
          }
        }));
      }

      room.state.players.onChange = function (changes) {
        console.log(player.score);
        console.log(player.rod.x);
        console.log(player.rod.y);

        setPlayer((p)=>({
          ...p,
          [player.username] : {
            score : player.score,
            x: player.rod.x,
            y: player.rod.y,
          }
        }));
      }
      room.state.players.onRemove = function (player, sessionId) {
        setPlayer(null);
      }
    }
  },[room])

  useEffect(() => {
    // Using an IIFE
    (async function anyNameFunction() {
      let c = new Colyseus.Client("ws://localhost:9000")
      //setClient(c);
      let room_instance = await c.joinOrCreate("fishgame", {}).then(room => (room))
      console.log(room_instance)
      setRoomInstance(room_instance);
      /*
      if(room){
        room.onStateChange((state) => {
          console.log("the room state has been updated:", state);
          
        });
      }
      */
      
    })();
  }, []);

  useFrame(({ mouse }) => {
    //console.log(xPos + ": x " + yPos + ": y")
    if (room) {
      if (xPos + mouse.x <= lim && xPos + mouse.x >= -lim && yPos >= 12) {
        //console.log("move left");
        setxPos(xPos + (mouse.x / 4));
        room.send("moveRod", { x: (mouse.x / 4) });
      }
      if (yPos + mouse.y <= 13 && yPos + mouse.y >= -15) {
        //console.log("move right");
        setyPos(yPos + (mouse.y / 4));
        room.send("moveRod", { y: (mouse.y / 4) });
      }


    }
  })






  // temporarily using the hook without the rod
  const texture = useLoader(THREE.TextureLoader, hookNoLine)
  //console.log(player);
  return (
    <>
    <Fish x={player["name"].x} y={player["name"].y} pointCount={40}/>
    
    <mesh
      position={[player["name"].x,player["name"].y,1]}
      geometry={hook.scene.children[2].geometry}
      material={hook.scene.children[2].material}
      scale={[2,2,2]}
    >
    </mesh>


    <mesh
     position={[player["name"].x, player["name"].y +18.5, 1]}
     scale={[.35,1,1]}
     >
  <boxGeometry args={[0.2, 30, 0]}/>
  <meshStandardMaterial attach="material" color='white'/>
</mesh>

</>
  )
  
}
export default RodAlt; 
