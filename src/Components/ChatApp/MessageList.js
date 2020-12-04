import React, {useRef, useEffect} from 'react';
import Message from './Message';


function MessageList(props){


    const ScrollToBottom = () => {
        const messageEl = useRef();
        useEffect(() => messageEl.current.scrollIntoView());
        return <div ref={messageEl} />;
    }
    

    return (
        <div className="message-list">
            {props.messages.map((message, index) => {
                return (
                    <Message key={index} username={message.name} text={message.text} time={message.time}/>
                );
            })}
            <ScrollToBottom />
        </div>
    );

}

export default MessageList;