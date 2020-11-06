import React, {useState} from 'react';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import Title from './Title';

function ChatApp(props){
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
    <div>
      <Title />
      <MessageList messages={messages}/>
      <SendMessageForm onSubmit={addMessage}/>

    </div>
  );
}

export default ChatApp;