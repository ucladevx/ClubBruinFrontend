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


export default function Player(props) {
  // keeps tracks of each individual player's position
  const playerPosition_x = useRef(props.x_position)
  const playerPosition_y = useRef(props.y_position)
  const isMoving = useRef([]);
  const [playerPosition, setPlayerPosition] = useState();

  const player = useRef();
  // state for if a player is at a location
  const [hovered, setHovered] = useState(false);
  const [atBorder, setAtBorder] = useState(false); 
  
  const location = useContext(PositionContext);

  // event listeners
  useEffect(() => {
    window.addEventListener('keydown',function(e){
      isMoving.current[e.keyCode] = true;
      })
  
    window.addEventListener('keyup', function(e) {
      delete isMoving.current[e.keyCode];
      })
  
  });
  // updates player positioning
  useEffect(() => {
    if (isMoving.current[39]) {
      playerPosition_x.current = playerPosition_x.current + .01;
    }
    else if (isMoving.current[37]) {
      playerPosition_x.current = playerPosition_x.current - .01;
    }
    else if (isMoving.current[38]) {
      playerPosition_y.current = playerPosition_y.current + .03;
    }
    else if (isMoving.current[40]) {
      playerPosition_y.current = playerPosition_y.current - .03;
    }
  });

  useFrame(() => {
    // console.log(window.innerWidth);
    setPlayerPosition({
      position: { x: playerPosition_x.current * 6, y: playerPosition_y.current * 2 },
    });
    
  });

  // Update the player's position from the updated state.
  useFrame(() => {
    player.current.position.y = playerPosition.position.y;
    player.current.position.x = playerPosition.position.x;
    console.log(window.devicePixelRatio, 'RATIO');
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
  <group>
    <Location x_position={0} y_position={0} player={player}/>
    <group ref={player}>
      <HTML>
        <img src={walk1} alt="earth" className="character" width={hovered ? 100:40}></img>
      </HTML>
    </group>
  </group>

  );
  
}
