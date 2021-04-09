import { React, useRef, useState } from 'react';
import { MdMailOutline, MdSettingsInputSvideo } from "react-icons/md";
import {CgProfile} from "react-icons/cg"
import Chat from './ChatApp';
import MapNavigator from './MapNavigator'

import '../App.css'

export default function NavComponent() {
    const [chatDisplayed, setChatDisplay] = useState("none");
    const [mapNavDisplayed, setMapNavDisplay] = useState("none");
    function displayChat() {
        if (chatDisplayed === "none") {
            setChatDisplay("block");
            setMapNavDisplay("none");
            return;
        }
        setChatDisplay("none")
    }
    function displayMapNav() {
        if (mapNavDisplayed === "none") {
            setMapNavDisplay("block");
            setChatDisplay("none");
            return;
        }
        setMapNavDisplay("none");
    }
    return (
        <>
        <div className="navPositionParent">
            <div className="navPositionChild">
                <div style={{ display: chatDisplayed }}>
                    <Chat />
                </div>
                <div style={{ display: mapNavDisplayed }}>
                    <MapNavigator />
                </div>
                <div style={{width:'300px', backgroundColor:'white', paddingTop:'8px', paddingBottom:'2px', borderTopLeftRadius:'20px', borderTopRightRadius:'20px'}}>
                    {/* <MdRefresh /> */}
                    <MdMailOutline style={{fontSize:'50px', marginLeft:'12%', cursor:'pointer'}} onClick={() => displayChat()}/>
                    <MdSettingsInputSvideo style={{fontSize:'50px', marginLeft:'14%', cursor:'pointer'}} onClick={() => displayMapNav()}/>
                    <CgProfile style={{fontSize:'50px', marginLeft:'15%', cursor:'pointer'}} onClick={() => {console.log("profile")}}/>
                </div>
            </div>
        </div>

        </>
    )
}