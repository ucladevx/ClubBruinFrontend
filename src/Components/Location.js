import React, { useState, useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import house from '../Sprites/house.png'
import { HTML, HTMLProps } from 'drei';
import Player from './Player'

const Location = (props) => {
    const location = useRef();
    const player = props.player;
    const position = {
        x: props.x_position,
        y: props.y_position,
    };

    // state for if a player is at a location
    const [hovered, setHovered] = useState(false); 

    // set the location position (not sure if this is necessary since locations will never change positions)
    useFrame(() => {
        location.current.position.x = position.x;
        location.current.position.y = position.y;
    })

    // check if player is at the house and alter state accordingly
    useFrame(() => {
        (player.current.position.x > location.current.position.x - 1 && player.current.position.x < location.current.position.x + 1) 
        && (player.current.position.y > location.current.position.y - 1 && player.current.position.y < location.current.position.y + 1) ? 
        setHovered(true) : setHovered(false);
    });

    // house becomes huge when player is at the house
    return (
        <group ref={location}>
           <HTML>
           <img src={house} alt="earth" className="location" width={hovered ? 100:50}></img>
           </HTML>
       </group>
    );
}

export default Location;