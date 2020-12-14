import React, { useMemo, useRef, useEffect, useState, Suspense } from "react"
import ReactDOM from "react-dom"
import { Canvas, extend, useFrame, useThree } from "react-three-fiber"
import { Html } from 'drei';
import Clownfish from '../../Sprites/clownfish.gif'
import Fish from './Fish'
import Rod from './Rod'
import Loading from '../../Sprites/loading2.gif'
import './index.css'
import {useHistory} from 'react-router-dom'

function FishGame() {
  const history = useHistory();
    return (
      <div className="map">
      <Canvas camera={{ position: [0, 0, 20] }}>
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
     <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      <Suspense fallback={<Html><img style={{marginLeft:'-60%', marginTop:'-50%'}} src={Loading} alt="loading..." width="500px"></img></Html>}>
        <Rod history={history}/>
      </Suspense>
        {/* <Suspense fallback={null}>
        <Fish pointCount={5} rod={Rod.rod}/>
        </Suspense> */}
    </Canvas>
      </div>
    )
  }

  export default FishGame;
  