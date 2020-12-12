import React, { useState, useEffect, useRef, useContext } from 'react';
import { useFrame } from 'react-three-fiber';
import house from '../../Sprites/house.png'
import { HTML, HTMLProps } from 'drei';
import { PositionContext } from './Scene';

const Location = () => {
    const location = useRef();
    
    const position = useContext(PositionContext);

    // set the location position (not sure if this is necessary since locations will never change positions)
    useEffect(() => {
        // location.current.position.x = position.x;
        // location.current.position.y = position.y;
        console.log(position);
    },[])

    // house becomes huge when player is at the house
    return (
        <group ref={location}>
            <HTML>
            <img src={house} alt="earth" className="location"></img>
            </HTML>
        </group>
    );
}

export default Location;