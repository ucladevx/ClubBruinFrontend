import React, { useRef, useEffect } from 'react';
import Message from './Message';


function MessageList(props) {


    const ScrollToBottom = () => {
        const messageEl = useRef();
        useEffect(() => messageEl.current.scrollIntoView());
        return <div ref={messageEl} />;
    }

    console.log(props.messages)

    return (
        <div className="message-list">
            {props.messages?.map((message, index) => {
                return (
                    /*<Message key={index} username={message.username} text={message.message} time={(new Date(message.timestamp)).toString()} />*/
                    <Message key={index} username={message.username} text={message.message} time={new Date(message.timestamp).getMonth() + 1 + '/' + new Date(message.timestamp).getDate() + '/' + new Date(message.timestamp).getFullYear() + ' ' + new Date(message.timestamp).getHours() + ':' + new Date(message.timestamp).getMinutes()} />
                );
            })}
            <ScrollToBottom />
        </div>
    );

}

export default MessageList;