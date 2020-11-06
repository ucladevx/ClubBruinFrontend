import React, {useState} from 'react';
import './App.css';
import MessageList from './Components/MessageList';
import SendMessageForm from './Components/SendMessageForm';
import Title from './Components/Title';

function App(props) {

  //Fake chats
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

  const addMessage = message => {
    setMessages([...messages, message]);
  }



  return (
    <div className="app">
      <Title />
      <MessageList messages={messages}/>
      <SendMessageForm onSubmit={addMessage}/>

    </div>
  );
}

export default App;
