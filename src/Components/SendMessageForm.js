import React, {useState} from 'react';

function SendMessageForm(props) {

    const [message, setMessage] = useState('');

    const handleChange = e => {
        setMessage(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        props.onSubmit({
            senderId: 'Me',
            text: message,
            time: 'Today'
        });
        setMessage('');
    }

    return (
        <form className="send-message-form" onSubmit={handleSubmit}>
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