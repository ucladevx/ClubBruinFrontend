import React, {useState, useEffect, useContext} from 'react';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import Title from './Title';
import connect from 'socket.io-client'
// import io from 'socket.io'
import './index.css'
//import { isCompositeComponentWithType } from 'react-dom/test-utils';
import {UsernameContext} from '../../UsernameContext'
<<<<<<< HEAD
import useSocket from 'use-socket.io-client';

function ChatApp(props){
  // const [socket, setSocket] = useState();
  // const [name, setName] = useState();
  // console.log(namename)
  const [socket] = useSocket('http://localhost:3333');

=======

function ChatApp(props){
  const [socket, setSocket] = useState();
  const [name, setName] = useState();
>>>>>>> dfbba6119fcfa0c1c9f2c1e0dcbec06aa364fbca
  const [messages, setMessages] = useState([
    // {
    //   senderId: 'Rick',
    //   text: 'We\'re no strangers to love',
    //   time: 'Monday'
    // },
    // {
    //   senderId: 'Astley',
    //   text: 'You know the rules and so do I',
    //   time: 'Monday'
    // },
    // {
    //   senderId: 'Rick',
    //   text: 'A full commitment\'s what I\'m thinking of',
    //   time: 'Tuesday'
    // }
  ]);


<<<<<<< HEAD
  const {user} = useContext(UsernameContext)

  useEffect(() => {
    // setName(user)
    //setName('name' + Math.floor(Math.random()*1000))
    // const s = connect('ws://localhost:3333')
    // setSocket(s)
    // console.log(s)
    socket.on('received', (p)=>{setMessages(m => [...m, p])})
    // return () => socket&&socket.disconnect();
  }, [])

  // useEffect(() => {
  //   console.log('called use effect')
  //   // console.log(socket&&socket.id)
    
  // socket&&socket.on("connect", () => {
  //   console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  // });
  //   socket&&socket.on('received', (p)=>{console.log(p);setMessages(m => [...m, p])})
  // }, [socket])

  const addMessage = message => {
    socket.emit('chat message', {text: message.text, name: user})
    setMessages([...messages, {...message, name: user}]);
=======
  const loggedUsername = useContext(UsernameContext)

  useEffect(() => {
    setName(loggedUsername)
    //setName('name' + Math.floor(Math.random()*1000))
    setSocket(connect('http://localhost:3333'))
    return () => socket&&socket.disconnect();
  }, [])

  useEffect(() => {
    socket&&socket.on('received', (p)=>{console.log(p);setMessages(m => [...m, p])})
  }, [socket])

  const addMessage = message => {
    socket.emit('chat message', {text: message.text, name: name})
    setMessages([...messages, {...message, name}]);
>>>>>>> dfbba6119fcfa0c1c9f2c1e0dcbec06aa364fbca
  }



  return (
    <div className="containerchat"> 
      <Title />
      <MessageList messages={messages}/>
      <SendMessageForm onSubmit={addMessage}/>

    </div>
  );
}

export default ChatApp;