import React, { useRef, useState, Suspense, useEffect, useKeyPress } from "react";
import ReactDOM from "react-dom";
import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas, useFrame, useLoader } from 'react-three-fiber'
import {Flex, Box} from 'react-three-flex'

let x_position = 0;
let y_position = 0;
let movingRight = false;
let movingLeft = false;
let movingUp = false;
let movingDown = false;

export default function Player() {
    const [playerPosition, setPlayerPosition] = useState();

    window.addEventListener('keydown',function(e){
      switch (e.keyCode) {
        case 39:
          movingLeft = movingUp = movingDown = false;
          movingRight=true;
          break;
        case 37:
          movingRight = movingUp = movingDown = false;
          movingLeft = true;
          break;
        case 38:
          movingRight = movingDown = movingLeft = false;
          movingUp = true;
          break;
        case 40:
          movingUp = movingRight = movingDown = false;
          movingDown = true;
          break;
          default:
      }
    })

      window.addEventListener('keyup', function(e) {
        switch (e.keyCode) {
          case 39:
            movingRight = false;
            break;
          case 37:
            movingLeft = false;
            break;
          case 38:
            movingUp = false;
            break;
          case 40:
            movingDown = false;
            break;
          default:
        }
    })
    useEffect(() => {
      if (movingRight===true) {
        x_position+=.01;
      }
      else if (movingLeft === true) {
        x_position-=.01
      }
      else if (movingUp === true) {
        y_position+=.03;
      }
      else if (movingDown === true) {
        y_position-=.03;
      }
    })
    const player = useRef();
    useFrame(() => {
      setPlayerPosition({
        position: { x: x_position * 6, y: y_position * 2 },
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
      <meshStandardMaterial color={ 'hotpink' } />
    </mesh>
      </group>

    );
  
}