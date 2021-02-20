import React, {useEffect, useState} from 'react'
// import './lobby.css'
// import './src/Components/Lobby/Lobby.css'
import './Lobby.css'
import { MdRefresh, MdLibraryAdd, MdArrowBack } from "react-icons/md";
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";
 
export default function Lobby(props) {

    let history = useHistory();
 
   const [fakeData, updateData] = useState(
       [
           {name:"The Room of Death", players: 6, status:"In Progress", hovered:false, id:35906, game:'/fishgame/'},
           {name: "My Room", players: 1, status: "Not Started", hovered:false, id:12906, game:'/fishgame/'},
           {name: "Rivalry Room", players: 3, status: "In Progress",hovered:false, id:66906, game:'/fishgame/'},
           {name: "DO NOT JOIN THIS ROOM", players: 1, status: "Not Started",hovered:false, id:54906, game:'/fishgame/'},
           {name: "SO BORED plz join", players: 3, status: "In Progress",hovered:false, id:44576, game:'/fishgame/'},
           {name:"The Room of Death", players: 6, status:"In Progress", hovered:false, id:45091, game:'/fishgame/'},
           {name: "My Room", players: 1, status: "Not Started", hovered:false, id:12306, game:'/fishgame/'},
           {name: "Rivalry Room", players: 3, status: "In Progress",hovered:false, id:75906, game:'/fishgame/'},
           {name: "DO NOT JOIN THIS ROOM", players: 1, status: "Not Started",hovered:false, id:72906, game:'/fishgame/'},
           {name: "SO BORED plz join", players: 3, status: "In Progress",hovered:false, id:48306, game:'/fishgame/'},
           {name:"The Room of Death", players: 6, status:"In Progress", hovered:false, id:41126, game:'/fishgame/'},
           {name: "My Room", players: 1, status: "Not Started", hovered:false, id:78806, game:'/fishgame/'},
           {name: "Rivalry Room", players: 3, status: "In Progress",hovered:false, id:47606, game:'/fishgame/'},
           {name: "DO NOT JOIN THIS ROOM", players: 1, status: "Not Started",hovered:false, id:54306, game:'/fishgame/'},
           {name: "SO BORED plz join", players: 3, status: "In Progress",hovered:false, id:11906, game:'/fishgame/'},
           {name: "Rivalry Room", players: 3, status: "In Progress",hovered:false, id:10906, game:'/fishgame/'},
           {name: "DO NOT JOIN THIS ROOM", players: 1, status: "Not Started",hovered:false, id:25906, game:'/fishgame/'},
           {name: "SO BORED plz join", players: 3, status: "In Progress",hovered:false, id:90906, game:'/fishgame/'},
 
 
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
        console.log("enter")
        console.log(room)
        console.log(props)
        props.joinRoom(room)
        // props.joinRoom(room);
    }

    function goBack() {
        history.push('/map');
    }

    useEffect(() => {
        console.log("")
    }, [])
 
   return (
       <div>
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
       </div>
   )
}
 
