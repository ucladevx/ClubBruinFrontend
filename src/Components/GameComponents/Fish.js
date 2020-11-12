import React, { useMemo, useRef, useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { Canvas, extend, useFrame, useThree } from "react-three-fiber"
import { Html } from 'drei';
import '../../App.css'
import Clownfish from '../../Sprites/clownfish.gif'


function Fish({ pointCount }) {

  const geom = useRef()
  useFrame(({ clock }) => {
    if (geom.current) {
      geom.current.position.x -= .2;
    }
  })


  function randomY() {
    if (Math.random() >= 0.5) {
      return 200
    }
    return -200;
  }

  var fish = []
  for (let i = 0; i < pointCount; i++) {
    fish.push(<img style={{position:"fixed", marginLeft:(Math.random() * 25000) + 'px', marginTop:(Math.random()*randomY()) + 'px', width:"70px"}} position={[i,i,i]} src={Clownfish} alt="clownfish"></img>)
  }

  return (
    <points ref={geom}>
      <Html attach="geometry">
        {fish}
      </Html>
    </points>
  )
}

export default Fish;