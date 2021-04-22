import React, { useState } from 'react';
import locationsData from './mapLocations.json'
import * as IconDesign from 'react-icons/gi'
import './index.css';

export default function MapNavigator () {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);
        
    const entries = locationsData.map ( (location, index) => {
        {
            const Icon = IconDesign[location.icon];
            return (
            <a 
                href={location.route == currentPath ? null : location.route } 
                class={`container-entry ${location.route == currentPath ? "active" : null}`}
                >
                {React.createElement(
                    Icon,
                    {class: "entry-icon"}
                )}
                <h2 class="entry-name">{location.name}</h2>
            </a>
            )
        }
    })

    return (
        <>
            <div id="container">
                <div class="container-title-box">
                    <h1 class="container-title">Map Navigator</h1>
                </div>
                {entries}
            </div>
            <div class="arrow-down"></div>
        </>
    )
}