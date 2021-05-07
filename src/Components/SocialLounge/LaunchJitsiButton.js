// import React from 'react';
import { React, useRef, useState } from 'react';
import { MdMailOutline, MdSettingsInputSvideo } from "react-icons/md";
import {CgProfile} from "react-icons/cg"
import {FaVideo} from "react-icons/fa"
import Chat from '../ChatApp/Index';
import {FaRocket} from "react-icons/fa";
import { useHistory } from "react-router-dom";

export default function  LaunchJitsiButton() {
    const history = useHistory();
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

    function goToLobby() {
        history.push("/sociallounge/something")
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
            <div className="navPositionChild2">
                <div style={{width:'80px', backgroundColor:'white', paddingTop:'8px', paddingBottom:'2px', borderTopLeftRadius:'20px', borderTopRightRadius:'20px'}}>
                    {/* <MdRefresh /> */}
                    <FaVideo style={{fontSize:'50px', marginLeft:'12%', cursor:'pointer'}} onClick={() => {goToLobby()}}/>
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