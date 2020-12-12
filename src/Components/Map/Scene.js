import React, { useState, useRef } from 'react';
import * as THREE from 'three';
import { Canvas } from 'react-three-fiber';
import Player from './Player';
import PlayerAlt from './PlayerAlt';
import Location from './Location';
import Light from './Light';
import GroundPlane from './Ground';
import Background from './Background';
import './Scene.css';

export const PositionContext = React.createContext();

const Scene = () => {
    const scene = useRef();
    const [players, setPlayers] = useState([<Player color={'hotpink'} x_position={0} y_position={0} current_player={true}/>]);
    const location = {
        x: 0,
        y: 0
    };

    function addPlayers() {
        // console.log("CLICK!")
        setPlayers(players.concat(<Player color={'skyblue'} x_position={0.2} y_position={0}/>))
    }

    return (
        <scene ref={scene}>
            {/* <div className="map" onClick={addPlayers}> */}
                <Canvas id="canvas">
                    <PositionContext.Provider value={location}>
                    <Light />
                    {/* {players} */}
                    <PlayerAlt current_player={true}/>
                    {/* <GroundPlane /> */}
                    {/* <Background /> */}
                    {/* <Location /> */}
                    </PositionContext.Provider>
                </Canvas>
            {/* </div> */}
        </scene>
    )
};

export default Scene;