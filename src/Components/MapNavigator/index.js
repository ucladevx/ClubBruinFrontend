import React, { useState } from 'react';
import locationsData from './mapLocations.json'
import './index.css';

export default function MapNavigator () {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);
        
    const entries = locationsData.map ( (location, index) => {
        {
            return (
            <a 
                href={location.route == currentPath ? null : location.route } 
                class={`container-entry ${location.route == currentPath ? "active" : null}`}
                >
                { /* replace the h1 tag below with
                 a small image or icon of map entry */ }
                <h1 class="entry-icon">{index}</h1>
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