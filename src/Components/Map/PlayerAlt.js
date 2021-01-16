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
import front1 from '../../Sprites/BobaFett/front1.png'
import front2 from '../../Sprites/BobaFett/front2.png'
import front3 from '../../Sprites/BobaFett/front3.png'
import front4 from '../../Sprites/BobaFett/front4.png'
import left1 from '../../Sprites/BobaFett/left1.png'
import left2 from '../../Sprites/BobaFett/left2.png'
import left3 from '../../Sprites/BobaFett/left3.png'
import left4 from '../../Sprites/BobaFett/left4.png'
import right1 from '../../Sprites/BobaFett/right1.png'
import right2 from '../../Sprites/BobaFett/right2.png'
import right3 from '../../Sprites/BobaFett/right3.png'
import right4 from '../../Sprites/BobaFett/right4.png'
import back1 from '../../Sprites/BobaFett/back1.png'
import back2 from '../../Sprites/BobaFett/back2.png'
import back3 from '../../Sprites/BobaFett/back3.png'
import back4 from '../../Sprites/BobaFett/back4.png'
// import * as Colyseus from '../../../node_modules/colyseus.js'


export default function PlayerAlt(props) {
  const texture = useLoader(THREE.TextureLoader, front1);
  const texture2 = useLoader(THREE.TextureLoader, front2);
  const texture3 = useLoader(THREE.TextureLoader, front3);
  const texture4 = useLoader(THREE.TextureLoader, front4);

  const left_1 = useLoader(THREE.TextureLoader, left1);
  const left_2 = useLoader(THREE.TextureLoader, left2);
  const left_3 = useLoader(THREE.TextureLoader, left3);
  const left_4 = useLoader(THREE.TextureLoader, left4);

  const right_1 = useLoader(THREE.TextureLoader, right1);
  const right_2 = useLoader(THREE.TextureLoader, right2);
  const right_3 = useLoader(THREE.TextureLoader, right3);
  const right_4 = useLoader(THREE.TextureLoader, right4);

  const back_1 = useLoader(THREE.TextureLoader, back1);
  const back_2 = useLoader(THREE.TextureLoader, back2);
  const back_3 = useLoader(THREE.TextureLoader, back3);
  const back_4 = useLoader(THREE.TextureLoader, back4);


  const [client, setClient] = useState();
  // keeps tracks of each individual player's position
  const playerPosition_x = useRef(0)
  const [score, setScore] = useState(0);
  const playerPosition_y = useRef(0)
  const isMoving = useRef([]);
  const [playerPosition, setPlayerPosition] = useState();
  const [players, setPlayers] = useState({
  
  });
  const [playerImage, setImage] = useState(texture)

  // console.log(players)

  // state for if a player is at a location
  const [hovered, setHovered] = useState(false);
  const [atBorder, setAtBorder] = useState(false); 
  
  const location = useContext(PositionContext);

  function updateScore(score) {
    return (score+1);
  }

  function getImage(curr_img, direction) {
    if (direction == "forward") {
      switch (curr_img) {
        case texture:
          return texture2;
          break;
        case texture2:
          return texture3;
          break;
        case texture3:
          return texture4;
          break;
        default:
          return texture;
          break;
      } 
    }
    else if (direction == "left") {
      switch (curr_img) {
        case left_1:
          return left_2;
          break;
        case left_2:
          return left_3;
          break;
        case left_3:
          return left_4;
          break;
        default:
          return left_1;
          break;
      } 
    }

    else if (direction == "right") {
      switch (curr_img) {
        case right_1:
          return right_2;
          break;
        case right_2:
          return right_3;
          break;
        case right_3:
          return right_4;
          break;
        default:
          return right_1;
          break;
      } 
    }

    else {
      switch (curr_img) {
        case back_1:
          return back_2;
          break;
        case back_2:
          return back_3;
          break;
        case back_3:
          return back_4;
          break;
        default:
          return back_1;
          break;
      } 
    }
    // if (curr_img === texture) {
    //   return texture2;
    // }
    // else {
    //   return texture;
    // }
  }

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
            //setScore(score + 1);
            console.log('update', score)
            // setImage(playerImage => setImage(playerImage))
            // setScore(score => score + 1);
            setImage(playerImage => getImage(playerImage, 'back'));
          }
          else if (isMoving.current[39]) {
            room.send("move", { x: 1 });
            setImage(playerImage => getImage(playerImage, 'right'));
          }
          else if (isMoving.current[40]) {
            room.send("move", { y: -1 });
            setImage(playerImage => getImage(playerImage, 'forward'))
          }
          else if (isMoving.current[37]) {
            room.send("move", { x: -1 });
            setImage(playerImage => getImage(playerImage, 'left'));
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

        
        <mesh position={[players[key].x, players[key].y, 0]}>
             <planeBufferGeometry attach="geometry" args={[2, 2]} />
             {/* <planeBufferGeometry attach="geometry" args={[2, 2]} /> */}
             <meshBasicMaterial attach="material" map={playerImage} toneMapped={false} />
        </mesh>
          </group>

        )
      }
      </Suspense>
    </>

  );
  
}
