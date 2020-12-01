import React, { useRef, useState, Suspense, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas, useFrame, useLoader } from 'react-three-fiber'
import {Flex, Box} from 'react-three-flex'
import walk1 from '../Sprites/walk1.png'
import { HTML, HTMLProps } from 'drei';
import Location from './Location';
import { PositionContext } from './Scene';
import * as Colyseus from '../../node_modules/colyseus.js/dist/colyseus.dev.js';


export default function PlayerAlt(props) {
  const [client, setClient] = useState();
  // keeps tracks of each individual player's position
  const playerPosition_x = useRef(0)
  const playerPosition_y = useRef(0)
  const isMoving = useRef([]);
  const [playerPosition, setPlayerPosition] = useState();

  const player = useRef();
  // state for if a player is at a location
  const [hovered, setHovered] = useState(false);
  const [atBorder, setAtBorder] = useState(false); 
  
  const location = useContext(PositionContext);

  useEffect(async () => {
    console.log(Colyseus);
    let c = new Colyseus.Client("ws://localhost:2567");
    setClient(c);
    var room;
    c.joinOrCreate("map").then(room_instance => {
        console.log(room_instance.state.players);

        room = room_instance;

        window.addEventListener("keydown", function(e) {
          isMoving.current[e.keyCode] = true;
          if (isMoving.current[38]) {
            room.send("move", { y: -1 });
          }
          else if (isMoving.current[39]) {
            room.send("move", { x: 1 });
          }
          else if (isMoving.current[40]) {
            room.send("move", { y: 1 });
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

  // updates player positioning
  useEffect(() => {
    if (isMoving.current[39]) {
      playerPosition_x.current = playerPosition_x.current + 0.1;
    }
    else if (isMoving.current[37]) {
      playerPosition_x.current = playerPosition_x.current - 0.1;
    }
    else if (isMoving.current[38]) {
      playerPosition_y.current = playerPosition_y.current + 0.1;
    }
    else if (isMoving.current[40]) {
      playerPosition_y.current = playerPosition_y.current - 0.1;
    }
  });

  useFrame(() => {
    setPlayerPosition({
      position: { x: playerPosition_x.current, y: playerPosition_y.current },
    });
  })

  // Update the player's position from the updated state.
  useFrame(() => {
    player.current.position.y = playerPosition.position.y;
    player.current.position.x = playerPosition.position.x;
    // console.log(window.devicePixelRatio, 'RATIO');
  });

  // check if player is at the house and alter state accordingly
  useFrame(() => {
    (player.current.position.x > location.x - 1 && player.current.position.x < location.x + 1) 
    && (player.current.position.y > location.y - 1 && player.current.position.y < location.y + 1) ? 
    setHovered(true) : setHovered(false);

    // if (player.current.position.x === 10 || ) {
    //   setAtBorder(true);
    // }
  });

  <Suspense fallback={<div>Loading... </div>}/>

  return (
    <group ref={player}>
        <HTML>
          <img src={walk1} alt="earth" className="character" width={hovered ? 100:40}></img>
        </HTML>
    </group>

  );
  
}
