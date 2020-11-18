import React, { useMemo, useRef, useEffect, useState, Suspense } from "react"
import ReactDOM from "react-dom"
import { Canvas, extend, useFrame, useThree } from "react-three-fiber"
import { Html } from 'drei';
import './App.css'
import Clownfish from './Sprites/clownfish.gif'
import Fish from './Components/GameComponents/Fish'
import Rod from './Components/GameComponents/Rod'


function App() {
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

// function App() {
//   // const [players, setPlayers] = useState([<Player color={'hotpink'} x_position={0} y_position={0} current_player={true}/>]);
//   // function addPlayers() {
//   //   // console.log("CLICK!")
//   //   setPlayers(players.concat(<Player color={'skyblue'} x_position={0.2} y_position={0}/>))
//   // }

//   return (
//     // <div className="map" onClick={addPlayers}>
//     <div className="map">
//     <Canvas id="canvas">
//       <Light />
//       {/* {players} */}
//       <Player color={'hotpink'} x_position={0} y_position={0} current_player={true}/>
//       <GroundPlane />
//       <BackDrop />
//       {/* <Location x_position={0} y_position={0}></Location> */}
//     </Canvas>
//     </div>
//   );
// }


export default App;
