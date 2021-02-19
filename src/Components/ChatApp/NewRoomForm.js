//can be used to create new private group chats or 1 to 1 dms
//choose whether to create a group chat or dm, or add functionality
//to add and remove people from chats

//function for group chats: search for multiple users, form chat room,
//give option to name chat room
//function for dms: search for a user, form chat room for just two people

import React, {useState} from 'react'

function NewRoomForm(props) {

    const [chatroomName, setChatroomName] = useState('')

    const handleChange = e => {
        setChatroomName(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        props.onSubmit(chatroomName)
        setChatroomName('')
    }

    return (
        <form className="new-room-form" onSubmit={handleSubmit}>
            <input
                placeholder='Name chatroom'
                type='text'
                onChange={handleChange}
                value={chatroomName}
            />
            <button>Create</button>
        </form>
    )
}

export default NewRoomForm
