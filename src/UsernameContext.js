/*
import {useState, createContext} from 'react'
import SigninForm from './Components/SigninForm'

const [user, setUser] = useState("")
const fn = (username) => {
    setUser(username)
}

export const UsernameContext = createContext();
*/

import React, {useState, createContext} from 'react'
/*
function UsernameContext(){

    const [user, setUser] = useState("")
    const fn = (username) => {
        setUser(username)
    }
*/
//     const UsernameContext = createContext();

//     return (

//     )
// }
export const UsernameContext = createContext();

//name, setName, token, setToken
//token is given for every username and session

export function Provider({children}){
    const [user, setUser] = useState("boop")
    return (
        <UsernameContext.Provider value = {{
            user, setUser
        }}>
            {children}
        </UsernameContext.Provider>
    )
}