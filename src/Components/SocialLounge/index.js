import React, { useState } from 'react'
import JitsiMeet from './JitsiMeet'
import './index.css'

export default function SocialLounge (props) {
    const [meetingID, setmeetingID] = useState("");
    const [jitsi, setJitsi] = useState(false)

    return (
        <>
            {
            jitsi ? 
            <JitsiMeet meetingID={meetingID}/>
            :
            <div id="create-container">
                <form onSubmit={() => setJitsi(true)}>
                    <h1>Join/Create Meeting ID</h1>
                    <input className="input-field" placeholder="MeetingID" value={meetingID} onChange={e => setmeetingID(e.target.value)} required></input>
                    <button className="start-button" type="submit">Start Meeting</button>
                    </form>
            </div>
            }
        </>
    )
}