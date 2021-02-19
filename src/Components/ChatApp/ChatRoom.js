import React, {useState, useEffect, useContext} from 'react';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import Title from './Title';
import connect from 'socket.io-client'
import {UsernameContext} from '../../UsernameContext'
import useSocket from 'use-socket.io-client';

function ChatRoom(props) {

    const [socket] = useSocket('http://localhost:3333');

    const [messages, setMessages] = useState([]);

    const {user} = useContext(UsernameContext)

    useEffect(() => {
        socket.on('received', (p)=>{setMessages(m => [...m, p])})
    }, [])

    const addMessage = message => {
        socket.emit('chat message', {text: message.text, name: sessionStorage.getItem("username")})
        setMessages([...messages, {...message, name: sessionStorage.getItem("username")}]);
    }

    return (
        <div className="containerchat">
            <Title title={props.identifier}/>
            <MessageList messages={messages}/>
            <SendMessageForm onSubmit={addMessage}/>
        </div>
    )
}

export default ChatRoom
