import React, {useState} from 'react'
import axios from 'axios'
import "./index.css"
import LoginForm from './LoginForm'

function Login() {

    /*
    const [users, setUsers] = useState([])

    const [string, setString] = useState('')
    const fn = async (usr, pw, email) => {
        const test =  await axios({
            method: 'POST',
            url: 'http://localhost:9000/auth/signup',
            data:{
                "username": "User3",
                "password": "pwd",
                "email": "emai4l@email.com"
            }
        }).then((res) => {
            return res.data
        })
        console.log(test)
        // setString(test.message)
    }
    useEffect(fn, [])
    // make a form that keeps track of values
    // function that takes in sername, pwd, and email
    // calls the backend

    const addUser = user => {
        setUsers([...users, user])
    }

    */

    const [string, setString] = useState('')
    const fn = async({username, password, email}) => {
        console.log(username)
        const test = await axios({
            method: 'POST',
            url: 'http://localhost:9000/auth/signup',
            data:{
                "username": username,
                "password": password,
                "email": email
            }
        })
        .then((res) => {
            return res.data
        })
        setString(test.message)
        console.log(test.message)
        //Created user
    }
    




    return (
        
        <div className="signupArea">
            <div className="header">Sign Up:</div>

            <LoginForm helper={fn}/>
            
            {string.substring(0, 17)==='Signup successful' || string===''? 
            <div>{string && <div className="userSuccess">{string}</div>}</div> : 
            <div>{string && <div className="userError">{string}</div>}</div>}

            {/*
                bool? true: false
                
            */}
            
        </div>
        
    )
}

export default Login
