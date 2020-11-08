import logo from './logo.svg';
import './App.css';
import * as THREE from 'three';
import { Canvas } from 'react-three-fiber'
import Player from './Components/Player'
import Location from './Components/Location'
import Light from './Components/Light'
import GroundPlane from './Components/Ground'
import BackDrop from './Components/Background'
import ReactDOM, {useState} from 'react'


function App() {
  // const [players, setPlayers] = useState([<Player color={'hotpink'} x_position={0} y_position={0} current_player={true}/>]);
  // function addPlayers() {
  //   // console.log("CLICK!")
  //   setPlayers(players.concat(<Player color={'skyblue'} x_position={0.2} y_position={0}/>))
  // }

  return (
    // <div className="map" onClick={addPlayers}>
    <div className="map">
    <Canvas id="canvas">
      <Light />
      {/* {players} */}
      <Player color={'hotpink'} x_position={0} y_position={0} current_player={true}/>
      <GroundPlane />
      <BackDrop />
      {/* <Location x_position={0} y_position={0}></Location> */}
    </Canvas>
    </div>
  );
}


export default App;
