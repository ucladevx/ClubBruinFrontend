import React, { useEffect, useState } from 'react'
import JitsiMeet from './JitsiMeet'
import LoungeMap from './LoungeMap'
import Lobby from '../Lobby/Lobby'
import './index.css'

export default function JitsiDisplay (props) {
    const [meetingID, setmeetingID] = useState("");
    const [jitsi, setJitsi] = useState(false)

    function joinRoom(room) {
        console.log(room)
        setmeetingID(room.name);
        setJitsi(true);
    }

    return (
        <>
        {/* {
            <div>
                <LoungeMap />
            </div>
        } */}
            {
            jitsi ? 
            <JitsiMeet meetingID={meetingID}/>
            :
            <Lobby joinRoom={joinRoom}/>
            // <div id="create-container">
            //     <Lobby />
            //     <form onSubmit={() => setJitsi(true)}>
            //         <h1>Join/Create Meeting ID</h1>
            //         <input className="input-field" placeholder="MeetingID" value={meetingID} onChange={e => setmeetingID(e.target.value)} required></input>
            //         <button className="start-button" type="submit">Start Meeting</button>
            //         </form>
            // </div>
            }
        </>
    )
}