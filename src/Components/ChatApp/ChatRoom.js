import React, {useState, useEffect, useContext} from 'react';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import Title from './Title';
import connect from 'socket.io-client'
import {UsernameContext} from '../../UsernameContext'
import useSocket from 'use-socket.io-client';
import * as Colyseus from '../../../node_modules/colyseus.js/dist/colyseus.dev.js';

function ChatRoom(props) {
    const {user} = useContext(UsernameContext)
    const [messages, setMessages] = useState([]);
    const [client, setClient] = useState();
    const [room, setRoom]  = useState(null)

    //establish colyseus connection
    useEffect(() => {
        async function configureColyseus () {
            let c = new Colyseus.Client("ws://localhost:9000");
            setClient(c);

            await c.joinOrCreate("chat", {
                username: user,
                accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imxhc2FueWEiLCJlbWFpbCI6ImdhcmZpZWxkQGcudWNsYS5lZHUiLCJpYXQiOjE2MTQ1NDIxOTksImV4cCI6MTYxNTQwNjE5OX0.fcSUyAI_clMf86PoycZxeHfRWFaIu_bK3wI5sXhmm0A",
                chatId: props.id
            }).then(room_instance => {
                setRoom(room_instance)
            })
        }
        configureColyseus();
        return () => {
            room?.leave();
        }
    }, [room])

    //checks for any incoming message from colyseus server API
    room?.onMessage("chat-hist", (message) => {
        console.log("message received from server");
        console.log(message);
        setMessages(message)
    });

    return (
        <div className="containerchat">
            <Title title={props.identifier}/>
            <MessageList messages={messages}/>
            <SendMessageForm/>
        </div>
    )
}

export default ChatRoom
