import React, { useEffect, useState } from 'react'
import './index.css'

export default function JitsiMeet (props) {
    const [jitsi, setJitsi] = React.useState({});

    const loadJitsiScript = () => {
        let resolveLoadJitsiScriptPromise = null;

        const loadJitsiScriptPromise = new Promise(resolve => {
            resolveLoadJitsiScriptPromise = resolve;
        });

        const script = document.createElement("script");
        script.src = "https://meet.jit.si/external_api.js";
        script.async = true;
        script.onload = () => resolveLoadJitsiScriptPromise(true);
        document.body.appendChild(script);

        return loadJitsiScriptPromise;
    };
    
    const initialiseJitsi = async () => {
        if (!window.JitsiMeetExternalAPI) {
            await loadJitsiScript();
        }

        const _jitsi = new window.JitsiMeetExternalAPI("meet.jit.si", {
            parentNode: document.getElementById("jitsi-container"),
            roomName: props.meetingID,
        });
        setJitsi(_jitsi);
    };

    useEffect (() => {
        initialiseJitsi();

        return () => jitsi?.dispose?.();
    }, [])

    return (
        <div id="jitsi-container">
        </div>
    )
}