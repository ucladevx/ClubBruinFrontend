import logo from './logo.svg';
import './App.css';
import * as THREE from 'three';
import { Canvas } from 'react-three-fiber'
import Player from './Components/Player'
import Light from './Components/Light'
import GroundPlane from './Components/Ground'
import BackDrop from './Components/Background'


function App() {
  return (
    <div className="map">
    <Canvas>
      <Light />
      <Player />
      <GroundPlane />
      <BackDrop />
    </Canvas>

    </div>
  );
}

export default App;
