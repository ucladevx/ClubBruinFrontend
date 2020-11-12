import React, { useRef } from "react"
import { useFrame } from "react-three-fiber"
import { Html } from 'drei';
import '../../App.css'
import Hook from '../../Sprites/hook.png'

function Rod() {
    const rod = useRef();

    useFrame(({mouse}) => {
        if (rod.current.position.x + mouse.x < 30 && rod.current.position.x + mouse.x > -30) {
            rod.current.position.x += mouse.x;
        }
        if (rod.current.position.y + mouse.y < 15 && rod.current.position.y + mouse.y > -10) {
            rod.current.position.y += mouse.y;
        }
    })
    
    return (
        <group ref={rod}>
        <Html>
            <img src={Hook} alt="hook"></img>
        </Html>
      </group>
      )
}

export default Rod;