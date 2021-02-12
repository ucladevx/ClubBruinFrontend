import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import Home from './Components/Home'
import GenericGame from './Components/GenericGame'
import FishGame from './Components/FishGame'
import Lobby from './Components/Lobby/Lobby'
import Map from './Components/Map'
import reportWebVitals from './reportWebVitals';
//import Home from './Components/Home'
import Login from './Components/Login'
import Chat from './Components/ChatApp'
//import {UsernameContext} from './UsernameContext'
import {Provider} from './UsernameContext'

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <Router>
          <div>
              <Switch>
                  {/* <Route exact path="/" component={Home} /> */}
                  {/* <Route exact path="/login" component={Login} /> */}     
                  <Route exact path="/" render = {() => <Provider><Login></Login></Provider>} />
                  <Route exact path="/chat" render = {() => <Provider><Chat></Chat></Provider>} />
                  <Route exact path="/map" render = {() => <Provider><Map></Map></Provider>} />
                  <Route exact path="/fishgame/:id" render = {() => <Provider><GenericGame gameType="map" location="lobby" chat={true} webcam={true}><FishGame></FishGame></GenericGame></Provider>} />
                  {/* <Route exact path="/fishgame" component={Lobby} /> */}
                  <Route exact path="/mapTest" render = {() => <Provider><GenericGame gameType="map" chat={false} webcam={false}><Map></Map></GenericGame></Provider>} />
                  {/* <Route exact path="/chat" component={Chat} /> */}
              </Switch>
          </div>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
