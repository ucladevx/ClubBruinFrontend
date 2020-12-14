import React, {useState} from 'react'
import './lobby.css'

function Lobby() {

    const [fakeData, updateData] = useState(
        [
            {name:"The Room of Death", players: 6, status:"In Progress", hovered:false},
            {name: "My Room", players: 1, status: "Not Started", hovered:false},
            {name: "Rivalry Room", players: 3, status: "In Progress",hovered:false},
            {name: "DO NOT JOIN THIS ROOM", players: 1, status: "Not Started",hovered:false},
            {name: "SO BORED plz join", players: 3, status: "In Progress",hovered:false},
        ]
    )

    function handleHover(room) {
        let newData = [...fakeData];
        const index = newData.indexOf(room)
        newData[index].hovered=!newData[index].hovered;
        updateData(newData)
    }

    return (
        <div style={{overflow:'hidden'}} className="lobbyContainer">
            <div className="lobbyBoard" style={{overflow:'scroll'}}>
                <p id="rooms" className="font">Rooms
                    <span style={{fontSize:'15px', paddingRight:'8px', float:'right', marginTop:'1px'}}>14 players in 5 rooms</span>
                </p>
                <div className="separator"></div>
                <table className="tableLabels">
                    <tr style={{textAlign:'left', fontWeight:'600'}}>
                        <th>Name</th>
                        <th>Players</th>
                        <th>Status</th>
                    </tr>
                    {fakeData.map(room => (
                        <tr className={room.hovered === false ? "rooms" : "hoveredRooms"}
                            onClick={() => {console.log(room)}} 
                            onMouseOver={() => {handleHover(room)}}
                            onMouseLeave={() => {handleHover(room)}}
                            >
                            <td>{room.name}</td>
                            <td>{room.players}</td>
                            <td>{room.status}</td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    )
}

export default Lobby;