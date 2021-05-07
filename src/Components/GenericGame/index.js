import React, { useState, useEffect, cloneElement, useContext } from 'react';
import { UsernameContext } from '../../UsernameContext';
import './index.css';
import Chat from './Chat';
import Webcam from './Webcam';
import Lobby from '../Lobby/Lobby';
import Launcher from './Launcher';
import * as Colyseus from '../../../node_modules/colyseus.js/dist/colyseus.dev.js';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import JitsiMeet from '../SocialLounge/JitsiMeet'

export default function GenericGame(props) {
	const [meetingID, setmeetingID] = useState("");
    const [jitsi, setJitsi] = useState(false)

	let history = useHistory();
	let location = useLocation();

	console.log(props.game);

	const { user } = useContext(UsernameContext);
	const [client, setClient] = useState();
	const [room, setRoom] = useState(null);
	const [isJoinedRoom, joinRoom] = useState(false);

	function joinARoom(chosenRoom) {
		joinRoom(true);
		history.push('/fishgame/' + chosenRoom.id);
	}

	function joinASocialRoom() {
		history.push({pathname:'/sociallounge/something'});
	}

	// we want the lobby to reload if the user goes back
	window.addEventListener('popstate', (event) => {
		window.location.reload();
	});

	useEffect(() => {
		// checks the pathname on changes, checks to display lobby or fish game
		let current_room = location.pathname.substr(-5);
		if (current_room == 'lobby') {
			joinRoom(false);
		} else {
			joinRoom(true);
		}
		console.log(location.pathname.substr(-5));
	});

	useEffect(() => {
		async function configureColyseus() {
			let c = new Colyseus.Client('ws://localhost:9000');
			setClient(c);

			await c
				.joinOrCreate(props.gameType, {
					username: user,
					accessToken: sessionStorage.getItem('loginToken'),
				})
				.then((room_instance) => {
					setRoom(room_instance);
				});
		}
		configureColyseus();
		console.log(room);
	}, []);

	return (
		<div>
			{!isJoinedRoom && props.game==='fish' ? <Lobby joinRoom={joinARoom}/> : null}
			{!isJoinedRoom && props.game==='lounge' ? <Lobby joinRoom={joinASocialRoom} /> : null}
			{/* {props.chat && isJoinedRoom ? <Chat /> : null} */}
			{props.webcam && isJoinedRoom ? <Webcam /> : null}
			{isJoinedRoom
				? cloneElement(props.children, { room, username: user })
				: null}
		</div>
	);
}
