//lists group chats user is involved in
//either load chat list or public chat on default

//functionality: display list of chat room names, user can click on a
//chat room to look at, and go back to the list and click to see another
//one

//default chats: public chat, solitaire chat

//prototype: just make a bunch of fake sample chat rooms that a user
//can enter and type in

import React, { useState, useEffect, useContext } from 'react'
import NewRoomForm from './NewRoomForm'
import { UsernameContext } from '../../UsernameContext'
import axios from 'axios'

function RoomsList(props) {

    /*
    const setDisplayBoolTrue = () => {
        props.helper({
            displayBoolTrue: true
        })
    }
    */

    const { user } = useContext(UsernameContext)

    // ChatID -> { roomName, roomID }
    const [chatIDs, setChatIDs] = useState([
        {
            roomName: 'Public', roomID: '6040c127f3763d405f8cb620'
            // roomName: 'Other', roomID: '6040c127f3763d405f8cb620'
        }
    ])

    const setChatIDto = (chatID) => {
        console.log(chatID)
        props.currentChat(chatID)

    }

    const addRoom = (chatID) => {
        setChatIDs([...chatIDs, chatID])
    }

    useEffect(async () => {
        const response = await axios({
            method: 'POST',
            url: 'http://localhost:9000/chat/getUserChats',
            data: {
                "username": user //boop on refresh
            }
        })
        console.log(response.data)
        response.data.forEach(chatRoom => {
            console.log(chatRoom._id, chatRoom.chatName)
            addRoom({
                roomName: chatRoom.chatName,
                roomID: chatRoom._id
            })
        })
    }, [])

    return (
        <div>
            {chatIDs.map((chatRoom) => {
                console.log(chatRoom.roomID, chatRoom.roomName)
                return (
                    <button onClick={() => setChatIDto(chatRoom)} key={chatRoom.roomID}>{chatRoom.roomName}</button>
                )
            })}
            <NewRoomForm onSubmit={addRoom} />
        </div>
    )
}

export default RoomsList
