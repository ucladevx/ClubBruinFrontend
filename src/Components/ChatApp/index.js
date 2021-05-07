import React, {useState, useEffect} from 'react';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import Title from './Title';
import connect from 'socket.io-client'
// import io from 'socket.io'

function ChatApp(props){
  const [socket, setSocket] = useState();
  const [name, setName] = useState();
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

  useEffect(() => {
    setName('name' + Math.floor(Math.random()*1000))
    setSocket(connect('http://localhost:3333'))
    return () => socket&&socket.disconnect();
  }, [])

  useEffect(() => {
    socket&&socket.on('received', (p)=>{console.log(p);setMessages(m => [...m, p])})
  }, [socket])

  const addMessage = message => {
    socket.emit('chat message', {text: message.text, name: name})
    setMessages([...messages, {...message, name}]);
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