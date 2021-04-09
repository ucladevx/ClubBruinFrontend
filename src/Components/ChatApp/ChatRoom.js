import React, { useState, useEffect, useContext } from 'react';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import Title from './Title';
import connect from 'socket.io-client';
import { UsernameContext } from '../../UsernameContext';
import useSocket from 'use-socket.io-client';
import * as Colyseus from '../../../node_modules/colyseus.js/dist/colyseus.js';

function ChatRoom(props) {
	const { user } = useContext(UsernameContext);
	const [messages, setMessages] = useState([]);
	const [client, setClient] = useState();
	const [room, setRoom] = useState(null);

	const sendMessage = (text, time) => {
		console.log('sending message to server');
		console.log(text);
		room.send('chat-send', text);
		/*
        room.send(0, { direction: "left"});
        */
		setMessages((msgs) =>
			setMessages([
				...msgs,
				{ message: text, username: user, timestamp: Date.now() },
			])
		);
	};

	//establish colyseus connection
	useEffect(() => {
		async function configureColyseus() {
			let c = new Colyseus.Client('ws://localhost:9000');
			setClient(c);
			console.log(props.id);
			await c
				.joinOrCreate('chat', {
					username: user,
					accessToken: sessionStorage.getItem('loginToken'),
					chatId: props.id,
				})
				.then((room_instance) => {
					setRoom(room_instance);
				});
		}
		configureColyseus();
		return () => {
			room?.leave();
		};
	}, [room]);

	//checks for any incoming message from colyseus server API
	room?.onMessage('chat-hist', (message) => {
		console.log(props.id);
		console.log('message received from server');
		console.log(message);
		setMessages(message);
	});

	room?.onMessage('chat-recv', (message) => {
		console.log('message received from server');
		console.log(message);
		setMessages((msgs) => [...msgs, message]);
	});

	return (
		<div className='containerchat'>
			<Title title={props.identifier} />
			<MessageList messages={messages} />
			<SendMessageForm onSubmit={sendMessage} />
		</div>
	);
}

export default ChatRoom;
