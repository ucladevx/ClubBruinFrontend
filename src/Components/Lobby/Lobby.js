import React, {useState} from 'react'
// import './lobby.css'
// import './src/Components/Lobby/Lobby.css'
import './Lobby.css'
import { MdRefresh, MdLibraryAdd, MdArrowBack } from "react-icons/md";
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";
 
export default function Lobby() {

    let history = useHistory();
 
   const [fakeData, updateData] = useState(
       [
           {name:"The Room of Death", players: 6, status:"In Progress", hovered:false, id:35906},
           {name: "My Room", players: 1, status: "Not Started", hovered:false, id:12906},
           {name: "Rivalry Room", players: 3, status: "In Progress",hovered:false, id:66906},
           {name: "DO NOT JOIN THIS ROOM", players: 1, status: "Not Started",hovered:false, id:54906},
           {name: "SO BORED plz join", players: 3, status: "In Progress",hovered:false, id:44576},
           {name:"The Room of Death", players: 6, status:"In Progress", hovered:false, id:45091},
           {name: "My Room", players: 1, status: "Not Started", hovered:false, id:12306},
           {name: "Rivalry Room", players: 3, status: "In Progress",hovered:false, id:75906},
           {name: "DO NOT JOIN THIS ROOM", players: 1, status: "Not Started",hovered:false, id:72906},
           {name: "SO BORED plz join", players: 3, status: "In Progress",hovered:false, id:48306},
           {name:"The Room of Death", players: 6, status:"In Progress", hovered:false, id:41126},
           {name: "My Room", players: 1, status: "Not Started", hovered:false, id:78806},
           {name: "Rivalry Room", players: 3, status: "In Progress",hovered:false, id:47606},
           {name: "DO NOT JOIN THIS ROOM", players: 1, status: "Not Started",hovered:false, id:54306},
           {name: "SO BORED plz join", players: 3, status: "In Progress",hovered:false, id:11906},
           {name: "Rivalry Room", players: 3, status: "In Progress",hovered:false, id:10906},
           {name: "DO NOT JOIN THIS ROOM", players: 1, status: "Not Started",hovered:false, id:25906},
           {name: "SO BORED plz join", players: 3, status: "In Progress",hovered:false, id:90906},
 
 
       ]
   )
 
   function handleHover(room) {
       // let newData = [...fakeData];
       // const index = newData.indexOf(room)
       // newData[index].hovered=!newData[index].hovered;
       // updateData(newData)
   }

   function handleRefresh() {
    window.location.reload(false);
    }   

    function createRoom() {
        history.push('/fishgame/' + '62451')
    }

    function enterRoom(room) {
        console.log(room)
        history.push('/fishgame/' + room.id)
    }

    function goBack() {
        history.push('/map');
    }
 
   return (
       <div style={{overflow:'hidden'}} className="lobbyContainer">
           <div className="lobbyBoard" style={{overflow:'scroll'}}>
               <p id="rooms" className="font">Rooms
                   <span style={{fontSize:'15px', paddingRight:'8px', float:'right', marginTop:'1px'}}>28 players in 10 rooms</span>
               </p>
               <div className="separator"></div>
               <span className="buttonContainer">
                   <button className="button"  onClick={() => {handleRefresh()}}><MdRefresh /> Refresh</button>
                   <button className="button" onClick={() => {createRoom()}}><MdLibraryAdd /> <Link style={{textDecoration:'none', color:'white'}}>Create Room</Link></button>
                   <button className="button" onClick={() => {goBack()}}><MdArrowBack /> Back</button>
               </span>
 
               <table className="tableLabels">
                   <tr style={{textAlign:'left', fontWeight:'600'}}>
                       <th>Name</th>
                       <th>Players</th>
                       <th>Status</th>
                   </tr>
                   {fakeData.map(room => (
                       <tr className={room.hovered === false ? "rooms" : "hoveredRooms"}
                           onClick={() => {enterRoom(room)}}
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
 
