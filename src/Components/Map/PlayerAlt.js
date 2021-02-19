import React, { useRef, useState, Suspense, useEffect, useContext, useMemo } from "react";
import ReactDOM from "react-dom";
import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas, useFrame, useLoader } from 'react-three-fiber'
import {Flex, Box} from 'react-three-flex'
import walk1 from '../../Sprites/walk1.png'
import { HTML, HTMLProps } from 'drei';
import Location from './Location';
import { PositionContext } from './Scene';
import * as Colyseus from '../../../node_modules/colyseus.js/dist/colyseus.dev.js';
// import * as Colyseus from '../../../node_modules/colyseus.js'


export default function PlayerAlt(props) {
  const [client, setClient] = useState();
  // keeps tracks of each individual player's position
  const playerPosition_x = useRef(0)
  const playerPosition_y = useRef(0)
  const isMoving = useRef([]);
  const [playerPosition, setPlayerPosition] = useState();
  const [players, setPlayers] = useState({
  
  });

  // console.log(players)

  // state for if a player is at a location
  const [hovered, setHovered] = useState(false);
  const [atBorder, setAtBorder] = useState(false); 
  
  const location = useContext(PositionContext);

  useEffect(async () => {
    // console.log(Colyseus);
    let c = new Colyseus.Client("ws://localhost:9000");
    setClient(c);
    var room;
    
    c.joinOrCreate("map", {
      username: props.username
    }).then(room_instance => {
        // console.log(room_instance.state.players);

        room = room_instance;

        room.state.players.onAdd = function (player, sessionId) {
          // console.log('player', player)
          setPlayers((p)=>({
            ...p,
            [player.username] : {
              x: player.x,
              y: player.y,
            }
          }));
          player.onChange = function (changes) {
            // console.log('plyer update', player.username)
            setPlayers((p)=>({
              ...p,
              [player.username] : {
                x: player.x,
                y: player.y,
              }
            }));
          }
        }

        room.state.players.onRemove = function (player, sessionId) {
          setPlayers(p => {
            console.log(p);
            let obj = {}
            Object.keys(p).forEach((key) => {
                console.log(p);
                if (player.username !== key){
                  obj[key] = p[key]
                }
              })
            return obj  
          })
        }

        window.addEventListener("keydown", function(e) {
          isMoving.current[e.keyCode] = true;
          if (isMoving.current[38]) {
            room.send("move", { y: 1 });
          }
          else if (isMoving.current[39]) {
            room.send("move", { x: 1 });
          }
          else if (isMoving.current[40]) {
            room.send("move", { y: -1 });
          }
          else if (isMoving.current[37]) {
            room.send("move", { x: -1 });
          }
        })

        window.addEventListener("keyup", function(e) {
          delete isMoving.current[e.keyCode];
        })

    })
  }, [])

  useFrame(() => {
    // console.log(players)
    // if (players[username]) {
    //   // console.log(players[username].x);
    //   (players[username].x > location.x - 1 && players[username].x  < location.x + 1) 
    //   && (players[username].y  > location.y - 1 && players[username].y < location.y + 1) ? 
    //   setHovered(true) : setHovered(false);
    // }
  });

  // <Suspense fallback={<div>Loading... </div>}/>

  return (

    <>
      <Suspense fallback={null}>
      {
        // Object.keys(players).map(key =>
         Object.keys(players).map(key =>

          <group>

          <HTML position={[players[key].x, players[key].y, 0]}>
          <p style={{marginLeft: -props.username.length * (props.username.length / 8)}}>{props.username}</p>
              <img src={walk1} alt="earth" className="character" width={(hovered && key === props.username) ? 100:40}></img>
        </HTML>
          </group>

        )
      }
      </Suspense>
    </>

  );
  
}
