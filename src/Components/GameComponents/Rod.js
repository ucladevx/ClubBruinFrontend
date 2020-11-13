import React, { useRef, useEffect } from "react"
import { useFrame } from "react-three-fiber"
import { Html } from 'drei';
import '../../App.css'
import Hook from '../../Sprites/hook.png'

function Rod() {
    const rod = useRef();
    // mouse click triggers casting line
    var mouseClicked = false;
    // determines whether or not the line needs to return after its cast
    var isReturningToInitial = false;

    // may have to change how we do initial positioning because I'm not sure it's consistent across screen sizes
    useEffect(() => {rod.current.position.set(0,30,0)})

    // DON'T REALLY FEEL TOO GREAT ABOUT ALL THESE IF STATEMENTS IN USEFRAME
    useFrame(({mouse}) => {
        if (!mouseClicked && !isReturningToInitial) {
            if (rod.current.position.x + mouse.x < 30 && rod.current.position.x + mouse.x > -30) {
                rod.current.position.x += mouse.x;
            }
        }
        else if (mouseClicked && !isReturningToInitial){
            rod.current.position.y -= .25;
        }
        else {
            if (rod.current.position.y < 30) {
                rod.current.position.y += .25;
            }
            else {isReturningToInitial=false}
        }
    })

    document.addEventListener("mousedown", () => {mouseClicked=true;isReturningToInitial=false})
    document.addEventListener("mouseup", () => {isReturningToInitial=true;mouseClicked=false})


    return (
        <group ref={rod}>
        <Html>
            <img src={Hook} alt="hook"></img>
        </Html>
      </group>
      )
}

export default Rod; 
