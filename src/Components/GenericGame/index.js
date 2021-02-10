import React, { useState, useEffect, cloneElement, useContext } from 'react';
import {UsernameContext} from '../../UsernameContext'
import './index.css';
import Chat from './Chat'
import Webcam from './Webcam'
import * as Colyseus from '../../../node_modules/colyseus.js/dist/colyseus.dev.js';

export default function GenericGame (props) {
    const {user} = useContext(UsernameContext)
    const [client, setClient] = useState();
    const [room, setRoom]  = useState(null)

    useEffect(() => {
        async function configureColyseus () {
            let c = new Colyseus.Client("ws://localhost:9000");
            setClient(c);
    
            await c.joinOrCreate(props.gameType, {
                username: user
            }).then(room_instance => {
                setRoom(room_instance)
            })
        }
        configureColyseus();
        console.log(room)
    }, [])

    return (
        <div>
            { props.chat ? <Chat/> : null }
            { props.webcam ? <Webcam/> : null }
            { cloneElement(props.children, {room, username: user}) }
        </div>
    );
}