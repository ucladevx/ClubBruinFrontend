//lists group chats user is involved in
//either load chat list or public chat on default

//functionality: display list of chat room names, user can click on a
//chat room to look at, and go back to the list and click to see another
//one

//default chats: public chat, solitaire chat

//prototype: just make a bunch of fake sample chat rooms that a user
//can enter and type in

import React, {useState} from 'react'
import NewRoomForm from './NewRoomForm'

function RoomsList(props) {

    /*
    const setDisplayBoolTrue = () => {
        props.helper({
            displayBoolTrue: true
        })
    }
    */

    const [chatIDs, setChatIDs] = useState(['Public', 'Other'])

    const setChatIDto = (chatID) => {
        console.log(chatID)
        props.currentChat(chatID)
        
    }

    const addRoom = (chatID) => {
        setChatIDs([...chatIDs, chatID])
    }

    return (
        <div>
            {chatIDs.map((chatID, index) => {
                return (
                    <button onClick={() => setChatIDto(chatID)} key={index}>{chatID}</button>
                )
            })}
            <NewRoomForm onSubmit={addRoom} />
        </div>
    )
}

export default RoomsList
