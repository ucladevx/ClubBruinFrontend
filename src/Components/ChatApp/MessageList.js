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
                    <Message key={index} username={message.username} text={message.message} time={(new Date(message.timestamp)).toString()} />
                );
            })}
            <ScrollToBottom />
        </div>
    );

}

export default MessageList;