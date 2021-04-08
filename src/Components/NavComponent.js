import { React, useRef, useState } from 'react';
import { MdMailOutline, MdSettingsInputSvideo } from "react-icons/md";
import {CgProfile} from "react-icons/cg"
import Chat from './ChatApp/Index';

import '../App.css'

export default function NavComponent() {
    const [chatDisplayed, setChatDisplay] = useState("none");
    function displayChat() {
        if (chatDisplayed == "none") {
            setChatDisplay("block")
            return
        }
        setChatDisplay("none")
    }
    return (
        <>
        <div className="navPositionParent">
            <div className="navPositionChild">
                <div style={{display:chatDisplayed}}>
                    <Chat />
                </div>
                <div style={{width:'300px', backgroundColor:'white', paddingTop:'8px', paddingBottom:'2px', borderTopLeftRadius:'20px', borderTopRightRadius:'20px'}}>
                    {/* <MdRefresh /> */}
                    <MdMailOutline style={{fontSize:'50px', marginLeft:'12%', cursor:'pointer'}} onClick={() => {displayChat()}}/>
                    <MdSettingsInputSvideo style={{fontSize:'50px', marginLeft:'14%', cursor:'pointer'}} onClick={() => {console.log("middle")}}/>
                    <CgProfile style={{fontSize:'50px', marginLeft:'15%', cursor:'pointer'}} onClick={() => {console.log("profile")}}/>
                </div>
            </div>
        </div>

        </>
    )
}