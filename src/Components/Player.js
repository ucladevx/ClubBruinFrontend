import React, { useRef, useState, Suspense, useEffect, useKeyPress } from "react";
import ReactDOM from "react-dom";
import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas, useFrame, useLoader } from 'react-three-fiber'
import {Flex, Box} from 'react-three-flex'


export default function Player(props) {
  // keeps tracks of each individual player's position
  const playerPosition_x = useRef(props.x_position)
  const playerPosition_y = useRef(props.y_position)
  const isMoving = useRef([]);
  const [playerPosition, setPlayerPosition] = useState();

  // event listeners
  useEffect(() => {
    window.addEventListener('keydown',function(e){
      isMoving.current[e.keyCode] = true;
      })
  
    window.addEventListener('keyup', function(e) {
      delete isMoving.current[e.keyCode];
      })
  
    })
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
    })
    const player = useRef();
    useFrame(() => {
      setPlayerPosition({
        position: { x: playerPosition_x.current * 6, y: playerPosition_y.current * 2 },
      });
      
    });

    // Update the player's position from the updated state.
    useFrame(() => {
      player.current.position.y = playerPosition.position.y;
      player.current.position.x = playerPosition.position.x;
    });
  
  
    <Suspense fallback={<div>Loading... </div>}>
</Suspense>

    return (
      <group ref={player}>
          <mesh visible userData={{ test: "player" }} rotation={[0, 0, 0]} position={[0, 0, 0]} castShadow>
      {/* <sphereGeometry attach="geometry" args={[1, 16, 16]} /> */}
      <boxGeometry attach="geometry" args={[1, 1, .00001]} />
      <meshStandardMaterial color={ props.color } />
    </mesh>
      </group>

    );
  
}
