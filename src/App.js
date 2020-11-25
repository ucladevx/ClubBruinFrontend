import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import * as THREE from 'three';
import { Canvas } from 'react-three-fiber'
import Player from './Components/Player'
import Location from './Components/Location'
import Light from './Components/Light'
import GroundPlane from './Components/Ground'
import BackDrop from './Components/Backdrop'
import Scene from './Components/Scene'


// !!CLICK CANVAS TO ADD MORE "PLAYERS"!!


export default function App() {
  return (
    <Scene/>
  );
}

