import React, {useState, useEffect} from 'react';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import Title from './Title';
import connect from 'socket.io-client'
// import io from 'socket.io'

function ChatApp(props){
    //Fake chats
    // let socket;
  const [socket, setSocket] = useState();
  const [messages, setMessages] = useState([
    {
      senderId: 'Rick',
      text: 'We\'re no strangers to love',
      time: 'Monday'
    },
    {
      senderId: 'Astley',
      text: 'You know the rules and so do I',
      time: 'Monday'
    },
    {
      senderId: 'Rick',
      text: 'A full commitment\'s what I\'m thinking of',
      time: 'Tuesday'
    }
  ]);

  useEffect(() => {
    setSocket(connect('http://localhost:3333'))
    return () => socket&&socket.disconnect();
  }, [])

  useEffect(() => {
    socket&&socket.on('received', (p)=>{console.log(p);setMessages(m => [...m, p])})
  }, [socket])

  const addMessage = message => {
    // console.log(socket)

    socket.emit('chat message', message.text)
    setMessages([...messages, message]);
  }



  return (
    <div>
      <Title />
      <MessageList messages={messages}/>
      <SendMessageForm onSubmit={addMessage}/>

    </div>
  );
}

export default ChatApp;