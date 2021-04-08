//can be used to create new private group chats or 1 to 1 dms
//choose whether to create a group chat or dm, or add functionality
//to add and remove people from chats

//function for group chats: search for multiple users, form chat room,
//give option to name chat room
//function for dms: search for a user, form chat room for just two people

import React, { useState, useContext } from 'react'
import axios from 'axios'
import { UsernameContext } from '../../UsernameContext'

function NewRoomForm(props) {

    const [chatroomName, setChatroomName] = useState('')
    const [participant, setParticipant] = useState('')

    const { user } = useContext(UsernameContext)

    const handleChange = e => {
        setChatroomName(e.target.value)
    }

    const handleParticipantChange = e => {
        setParticipant(e.target.value)
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const response = await axios({
            method: 'POST',
            url: 'http://localhost:9000/chat/new',
            data: {
                "participants": ["ish", "lasanya"], //later: [participantList, user]
                "chatName": chatroomName,
                "username": user //boop on refresh
            }
        })
        console.log(response.data)
        props.onSubmit({ roomName: chatroomName, roomID: response.data.chatName })
        setChatroomName('')
        setParticipant('')
    }

    return (
        <form className="new-room-form" onSubmit={handleSubmit}>
            <label>Group Chat Name:
             <input
                    placeholder="chatroom"
                    type='text'
                    onChange={handleChange}
                    value={chatroomName}
                />
            </label>
            <label>
                Participant Name:
                 <input
                    placeholder="participant"
                    type='text'
                    onChange={handleParticipantChange}
                    value={participant}
                />
            </label>

            <button>Create</button>
        </form>
    )
}

export default NewRoomForm
