import logo from './logo.svg';
import './App.css';
import * as THREE from 'three';
import { Canvas } from 'react-three-fiber'
import Player from './Components/Player'
import Light from './Components/Light'
import GroundPlane from './Components/Ground'
import BackDrop from './Components/Background'
import ReactDOM, {useState} from 'react'


// !!CLICK CANVAS TO ADD MORE "PLAYERS"!!

function App() {
  const [players, setPlayers] = useState([<Player color={'hotpink'} x_position={0} y_position={0} current_player={true}/>]);
function addPlayers() {
  // console.log("CLICK!")
  setPlayers(players.concat(<Player color={'skyblue'} x_position={0.2} y_position={0}/>))
}

  return (
    <div className="map" onClick={addPlayers}>
    <Canvas id="canvas">
      <Light />
      {players}
      <GroundPlane />
      <BackDrop />
    </Canvas>
    </div>
  );
}


export default App;
