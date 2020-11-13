import React from 'react';
//import ReactDOM from 'react-dom';
import Message from './Message';

function MessageList(props){

    /*
    //These two methods just deal with scrolling
    const componentWillUpdate = () => {
        const node = ReactDOM.findDOMNode(this);
        this.shouldScrollBottom = node.scrollTop + node.clientHeight + 50 >= node.scrollHeight;
    };

    const componentDidUpdate = () => {
        if(this.shouldScrollBottom) {
            const node = ReactDOM.findDOMNode(this);
            node.scrollTop = node.scrollHeight;
        };
    };
    */

    return (
        <div className="message-list">
            {props.messages.map((message, index) => {
                return (
                    <Message key={index} username={message.name} text={message.text} time={message.time}/>

                );
            })}
        </div>
    );

}

export default MessageList;