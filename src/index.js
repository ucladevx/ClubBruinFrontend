import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";import reportWebVitals from './reportWebVitals';
import Home from './Components/Home'
import FishGame from './Components/FishGame'
import Game from './Components/FishGame/Game'

ReactDOM.render(
  <React.StrictMode>
    <Router>
        <div>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/fishgame" component={FishGame} />
            <Route exact path="/fishgame/id" component={Game}/>
        </Switch>
        </div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
