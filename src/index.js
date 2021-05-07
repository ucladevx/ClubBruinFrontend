import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Components/Home';
import GenericGame from './Components/GenericGame';
import FishGame from './Components/FishGame';
import Lobby from './Components/Lobby/Lobby';
import Map from './Components/Map';
import reportWebVitals from './reportWebVitals';
//import Home from './Components/Home'
import Login from './Components/Login'
import Chat from './Components/ChatApp/Index'
import SocialLounge from './Components/SocialLounge'
//import {UsernameContext} from './UsernameContext'
import { Provider } from './UsernameContext';
import InvertedFountain from './Components/Map/InvertedFountain';
import JitsiDisplay from './Components/SocialLounge/JitsiDisplay'

ReactDOM.render(
	<React.StrictMode>
		<Provider>
			<Router>
				<div>
					<Switch>
						{/* <Route exact path="/" component={Home} /> */}
						{/* <Route exact path="/login" component={Login} /> */}
						<Route
							exact
							path='/'
							render={() => (
								<Provider>
									<Login></Login>
								</Provider>
							)}
						/>
						<Route
							exact
							path='/chat'
							render={() => (
								<Provider>
									<Chat></Chat>
								</Provider>
							)}
						/>
						<Route
							exact
							path='/fishgame/:id'
							render={() => (
								<Provider>
									<GenericGame
										gameType='map'
										game="fish"
										location='lobby'
										chat={true}
										webcam={true}
									>
										<FishGame></FishGame>
									</GenericGame>
								</Provider>
							)}
						/>
						<Route
							exact
							path='/map/fountain'
							render={() => (
								<Provider>
									<InvertedFountain></InvertedFountain>
								</Provider>
							)}
						/>

						<Route
						exact
						path="/sociallounge/lobby"
						render={() => (
							<Provider>
									<GenericGame
										gameType='map'
										location='lobby'
										game="lounge"
										chat={true}
										webcam={true}
									>
										<FishGame></FishGame>
									</GenericGame>
							</Provider>
						)}
						></Route>

          <Route exact path="/sociallounge" render = {() => <Provider><SocialLounge></SocialLounge></Provider>} />
		  <Route exact path="/sociallounge/something" render = {() => <Provider><JitsiDisplay></JitsiDisplay></Provider>} />

						{/* <Route exact path="/fishgame" component={Lobby} /> */}
						<Route
							exact
							path='/map'
							render={() => (
								<Provider>
									<GenericGame
										gameType='map'
										chat={false}
										webcam={false}
									>
										<Map></Map>
									</GenericGame>
								</Provider>
							)}
						/>
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
