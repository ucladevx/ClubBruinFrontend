import React, { useMemo, useRef, useEffect, useState, Suspense } from "react"
import ReactDOM from "react-dom"
import { Canvas, extend, useFrame, useThree } from "react-three-fiber"
import { Html } from 'drei';
import Clownfish from '../../Sprites/clownfish.gif'
import Fish from './Fish'
import Rod from './Rod'
import './index.css'

function FishGame() {
    return (
      <div className="map">
      <Canvas camera={{ position: [0, 0, 20] }}>
        <Suspense fallback={null}>
        <Rod />
        </Suspense>
        {/* <Suspense fallback={null}>
        <Fish pointCount={5} rod={Rod.rod}/>
        </Suspense> */}
    </Canvas>
      </div>
    )
  }

  export default FishGame;
  