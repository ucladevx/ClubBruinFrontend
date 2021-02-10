import React, {
	useRef,
	useState,
	Suspense,
	useEffect,
	useContext,
	useMemo,
} from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Canvas, useFrame, useLoader } from 'react-three-fiber';
import { Flex, Box } from 'react-three-flex';
import walk1 from '../../Sprites/walk1.png';
import { HTML, HTMLProps } from 'drei';
import Location from './Location';
import { PositionContext } from './Scene';
import * as Colyseus from '../../../node_modules/colyseus.js/dist/colyseus.dev.js';
import Hammerhead from '../../Sprites/justhook.png';

// import * as Colyseus from '../../../node_modules/colyseus.js'

export default function PlayerAlt(props) {
	const hammer = require('../../Sprites/house.png');
	const front_1 = useLoader(
		THREE.TextureLoader,
		'Sprites/plain_bear/front_1.png'
	);
	const front_2 = useLoader(
		THREE.TextureLoader,
		'Sprites/plain_bear/front_2.png'
	);
	const front_3 = useLoader(
		THREE.TextureLoader,
		'Sprites/plain_bear/front_3.png'
	);
	const front_4 = useLoader(
		THREE.TextureLoader,
		'Sprites/plain_bear/front_4.png'
	);
	const left_1 = useLoader(
		THREE.TextureLoader,
		'Sprites/plain_bear/left_1.png'
	);
	const left_2 = useLoader(
		THREE.TextureLoader,
		'Sprites/plain_bear/left_2.png'
	);
	const left_3 = useLoader(
		THREE.TextureLoader,
		'Sprites/plain_bear/left_3.png'
	);
	const left_4 = useLoader(
		THREE.TextureLoader,
		'Sprites/plain_bear/left_4.png'
	);
	const right_1 = useLoader(
		THREE.TextureLoader,
		'Sprites/plain_bear/right_1.png'
	);
	const right_2 = useLoader(
		THREE.TextureLoader,
		'Sprites/plain_bear/right_2.png'
	);
	const right_3 = useLoader(
		THREE.TextureLoader,
		'Sprites/plain_bear/right_3.png'
	);
	const right_4 = useLoader(
		THREE.TextureLoader,
		'Sprites/plain_bear/right_4.png'
	);
	const back_1 = useLoader(
		THREE.TextureLoader,
		'Sprites/plain_bear/back_1.png'
	);
	const back_2 = useLoader(
		THREE.TextureLoader,
		'Sprites/plain_bear/back_2.png'
	);
	const back_3 = useLoader(
		THREE.TextureLoader,
		'Sprites/plain_bear/back_3.png'
	);
	const back_4 = useLoader(
		THREE.TextureLoader,
		'Sprites/plain_bear/back_4.png'
	);

	const [currentSprite, changeSprite] = useState(front_1);

	const [client, setClient] = useState();
	const ready = useRef(true);
	// keeps tracks of each individual player's position
	const playerPosition_x = useRef(0);
	const playerPosition_y = useRef(0);
	const isMoving = useRef([]);
	const [playerPosition, setPlayerPosition] = useState();
	const [players, setPlayers] = useState({});

	// console.log(players)

	// state for if a player is at a location
	const [hovered, setHovered] = useState(false);
	const [atBorder, setAtBorder] = useState(false);

	const location = useContext(PositionContext);

	useEffect(() => {
		if (props.room) {
			var room = props.room;

			room.state.players.onAdd = function (player, sessionId) {
				// console.log('player', player)
				setPlayers((p) => ({
					...p,
					[player.username]: {
						x: player.x,
						y: player.y,
					},
				}));
				player.onChange = function (changes) {
					// console.log('plyer update', player.username)
					setPlayers((p) => ({
						...p,
						[player.username]: {
							x: player.x,
							y: player.y,
						},
					}));
				};
			};

			room.state.players.onRemove = function (player, sessionId) {
				setPlayers((p) => {
					console.log(p);
					let obj = {};
					Object.keys(p).forEach((key) => {
						console.log(p);
						if (player.username !== key) {
							obj[key] = p[key];
						}
					});
					return obj;
				});
			};

			window.addEventListener('keydown', function (e) {
				isMoving.current[e.keyCode] = true;
				if (isMoving.current[38]) {
					room.send('move', { y: 1 });
				} else if (isMoving.current[39]) {
					room.send('move', { x: 1 });
				} else if (isMoving.current[40]) {
					room.send('move', { y: -1 });
				} else if (isMoving.current[37]) {
					room.send('move', { x: -1 });
				}
			});

			window.addEventListener('keyup', function (e) {
				delete isMoving.current[e.keyCode];
			});
		}
	}, [props.room]);

	function loadReady() {
		ready.current = true;
	}

	function updateSprite(current, direction) {
		if (direction == 40) {
			if (current == front_1) {
				return front_2;
			} else if (current == front_2) {
				return front_3;
			} else if (current == front_3) {
				return front_4;
			} else {
				return front_1;
			}
		}
		if (direction == 37) {
			if (current == left_1) {
				return left_2;
			} else if (current == left_2) {
				return left_3;
			} else if (current == left_3) {
				return left_4;
			} else {
				return left_1;
			}
		}
		if (direction == 39) {
			if (current == right_1) {
				return right_2;
			} else if (current == right_2) {
				return right_3;
			} else if (current == right_3) {
				return right_4;
			} else {
				return right_1;
			}
		}
		if (direction == 38) {
			if (current == back_1) {
				return back_2;
			} else if (current == back_2) {
				return back_3;
			} else if (current == back_3) {
				return back_4;
			} else {
				return back_1;
			}
		}
	}

	// function updateSprite(direction) {
	//   if (direction == 40) {
	//     console.log(currentSprite)
	//     if (currentSprite === front_1) {
	//       changeSprite(front_2)
	//     }
	//     else if (currentSprite === front_2) {
	//       changeSprite(front_3);
	//     }
	//     else if (currentSprite === front_3) {
	//       changeSprite(front_4);
	//     }
	//     else {
	//       changeSprite(front_1)
	//     }
	//   }
	// }

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
					Object.keys(players).map((key) => (
						<group>
							<mesh
								position={[players[key].x, players[key].y, 0]}
							>
								<planeBufferGeometry
									attach='geometry'
									args={[1, 1, 1]}
								/>
								<meshBasicMaterial
									attach='material'
									map={currentSprite}
									toneMapped={false}
									transparent={true}
								/>
							</mesh>
							{/* <HTML position={[players[key].x, players[key].y, 0]}>
          <p style={{marginLeft: -props.username.length * (props.username.length / 8)}}>{props.username}</p>
              <img src={walk1} alt="earth" className="character" width={(hovered && key === props.username) ? 100:40}></img>
        </HTML> */}
						</group>
					))
				}
			</Suspense>
		</>
	);
}
