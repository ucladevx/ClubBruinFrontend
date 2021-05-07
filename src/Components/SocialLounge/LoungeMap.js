import React from 'react'
import { Canvas } from 'react-three-fiber';
import {Html} from 'drei';
import NavComponent from '../NavComponent';
import LaunchJitsiButton from './LaunchJitsiButton';

export default function LoungeMap() {

    return(
        <div style={{ overflow:'none', height:'100vh' }}>
        <scene>
        <Canvas id="lounge-background">
            {/* <Html className="loungeButton">
                <button>CLICK ME</button>
            </Html> */}

        </Canvas>

        </scene>
        <NavComponent />
        <LaunchJitsiButton />
        </div>
        // <div id="lounge-background">
        // </div>
    )
}