


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
  //const [seshId,setId] = useState();
  const [rodPositions, setRodPositions] = useState({});
  
/*
  useEffect(async () => {
    // console.log(Colyseus);
    let c = new Colyseus.Client("ws://localhost:9000");
    setClient(c);
    c.joinOrCreate("fishgame", {
    }).then(room => {
        console.log("setting room");
        setRoomInstance(room);

        if (room) {
          console.log(" testing room");
          room.state.players.onAdd = function (player, sessionId) {
            
            console.log("adding player");
            setPlayer((p)=>({
              ...p,
              [sessionId] : {
                score : player.score,
                x: player.rod.x,
                y: player.rod.y,
              }
            }));
            console.log(playerz.x)
            console.log(playerz.y)
            player.onChange = function (changes) {
              changes.forEach(change => {
                console.log("change in player");
                console.log(playerz.x)
                console.log(playerz.y)
    
                setPlayer((p)=>({
                  ...p,
                  [sessionId] : {
                    score : player.score,
                    x: player.rod.x,
                    y: player.rod.y,
                  }
                }));
            });
              
            }
            player.triggerAll();
          }
          
          room.state.players.onRemove = function (player, sessionId) {
            setPlayer(null);
          }
        }
    }) 
  },[]); 
*/

 
  /*
  useEffect(async () => {
    if (room) {
      //console.log(" testing room");
      room.state.players.onAdd = function (player, sessionId) {
        console.log("adding player");
        console.log(player.rod.x);
        console.log(player.rod.y)
        console.log(player.score)
        setPlayer((p)=>({
          ...p,
          [sessionId] : {
            score : player.score,
            x: player.rod.x,
            y: player.rod.y,
          }
        }));

        player.onChange = function (changes) {
          changes.forEach(change => {
            console.log("change in player");
            console.log(player.rod.x)
            console.log(player.rod.y)

            setPlayer((p)=>({
              ...p,
              [sessionId] : {
                score : player.score,
                x: player.rod.x,
                y: player.rod.y,
              }
            }));
        });
        }

        player.triggerAll();
      }
      
      room.state.players.onRemove = function (player, sessionId) {
        setPlayer(null);
      }
    }
  },[room])
*/

  useEffect(() => {
    // Using an IIFE
    (async function anyNameFunction() {
      let c = await new Colyseus.Client("ws://localhost:9000")
      //setClient(c);
      const room = await c.joinOrCreate("fishgame", {});
      setRoomInstance(room);
      room.onStateChange((state) => {
        setxPos(state.players.get(room.sessionId).rod.x);
        setyPos(state.players.get(room.sessionId).rod.y);

        
        
        console.log(xPos);
        console.log(yPos)
        
      });
      /*
      room.state.players.onAdd = function (player, sessionId) {
        console.log(player.rod.x);
        console.log(player.rod.y);
        
        player.onChange = function(changes) {
          changes.forEach(change => {
            console.log(change.field);
            console.log(change.value);
            console.log(change.previousValue);
        })
        
        }
        player.triggerAll();
        
      }
    */
      
    
  })();

  },[]);
 

  useFrame(({ mouse }) => {
    //console.log(xPos + ": x " + yPos + ": y")
    if (room) {
      if (xPos + mouse.x <= lim && xPos + mouse.x >= -lim && yPos >= 12) {
        //console.log("move left");
        //setxPos(xPos + (mouse.x / 4));
        room.send("moveRod", { x: (mouse.x / 4) });
      }
      if (yPos + mouse.y <= 13 && yPos + mouse.y >= -15) {
        //console.log("move right");
        //setyPos(yPos + (mouse.y / 4));
        room.send("moveRod", { y: (mouse.y / 4) });
      }


    }
  })






  // temporarily using the hook without the rod
  const texture = useLoader(THREE.TextureLoader, hookNoLine)
  //console.log(player);
  return (
    <>
    <Fish x={xPos} y={yPos} pointCount={40}/>
    
    <mesh
      position={[xPos,yPos,1]}
      geometry={hook.scene.children[2].geometry}
      material={hook.scene.children[2].material}
      scale={[2,2,2]}
    >
    </mesh>


    <mesh
     position={[xPos, yPos +18.5, 1]}
     scale={[.35,1,1]}
     >
  <boxGeometry args={[0.2, 30, 0]}/>
  <meshStandardMaterial attach="material" color='white'/>
</mesh>

</>
  )
  
}
export default RodAlt; 
