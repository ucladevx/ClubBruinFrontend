import React, { useState } from 'react';
import { mockComponent } from 'react-dom/test-utils';

function SendMessageForm(props) {

    const [message, setMessage] = useState('');

    const handleChange = e => {
        e.preventDefault();
        setMessage(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        props.onSubmit(message,
            new Date().getMonth() + 1 + '/' + new Date().getDate() + '/' + new Date().getFullYear() + ' ' + new Date().getHours() + ':' + new Date().getMinutes());
        setMessage('');
    }

    return (
        <form className="send-message-form" onSubmit={(e) => handleSubmit(e)}>
            <input
                placeholder='Type message'
                type='text'
                onChange={handleChange}
                value={message}
                disabled={props.disabled}
            />
            <button className="send-message-button">Send</button>
        </form>
    );

}

export default SendMessageForm;