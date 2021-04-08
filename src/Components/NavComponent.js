import { React, useRef, useState } from 'react';
import { MdMailOutline, MdSettingsInputSvideo } from "react-icons/md";
import {CgProfile} from "react-icons/cg"
import Chat from './ChatApp/Index';
import {FaRocket} from "react-icons/fa";

import '../App.css'

export default function NavComponent() {
    const [chatDisplayed, setChatDisplay] = useState("none");
    const [launcherDisplayed, setLauncherDisplay] = useState("none");
    function displayChat() {
        if (chatDisplayed == "none") {
            setChatDisplay("block")
            return
        }
        setChatDisplay("none")
    }
    function displayLauncher() {
        if (launcherDisplayed == "none") {
            setLauncherDisplay("block");
        }
        else {
            setLauncherDisplay("none");
        }
    }
    return (
        <>
        <div class="sizing" style={{ display:launcherDisplayed, borderRadius:'5px' }}>
            <div class="header">
                <span style={{ textAlign:'center', fontSize:'30px' }}><FaRocket/> Destination Launcher</span>
                {/* <FaRocket /> */}
                {/* <p>Destination Launcher</p> */}
            </div>
		</div>
        <div className="navPositionParent">
            <div className="navPositionChild">
                <div style={{display:chatDisplayed}}>
                    <Chat />
                </div>
                <div style={{width:'300px', backgroundColor:'white', paddingTop:'8px', paddingBottom:'2px', borderTopLeftRadius:'20px', borderTopRightRadius:'20px'}}>
                    {/* <MdRefresh /> */}
                    <MdMailOutline style={{fontSize:'50px', marginLeft:'12%', cursor:'pointer'}} onClick={() => {displayChat()}}/>
                    <MdSettingsInputSvideo style={{fontSize:'50px', marginLeft:'14%', cursor:'pointer'}} onClick={() => {displayLauncher()}}/>
                    <CgProfile style={{fontSize:'50px', marginLeft:'15%', cursor:'pointer'}} onClick={() => {console.log("profile")}}/>
                </div>
            </div>
        </div>

        {/* <div class="sizing" style={{ width:'100px', height:'100px', backgroundColor:'yellow' }}></div> */}
        {/* <div class="sizing">
				<div>SHADOW OF DEATH</div>
		</div> */}


        </>
    )
}