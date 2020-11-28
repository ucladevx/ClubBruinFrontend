import React, {useState} from 'react'
import axios from 'axios'
import SigninForm from './SigninForm'

function Signin(props) {

    const [string, setString] = useState('')
    const fn = async({username, password}) => {
        const test = await axios({
            method: 'POST',
            url: 'http://localhost:9000/auth/signin',
            data:{
                "username": username,
                "password": password
            }
        })
        .then((res) => {
            return res.data.message
        })
        .catch((err) => {
            return err})
        // console.log('printing test' + typeof(test.toString()))
        setString(test.toString())

    }

    const setLoggedIn = () => {
        props.helper({
            loggedInBool: true
        })
    }
        


    return (
        <div>
            <div>
                <div className="header">Sign In:</div>
                <SigninForm helper={fn}/>
                {string.substring(0, 23)==='Successfully logged in.' || string===''? 
                <div>{string && <div className="userSuccess">{string}{setLoggedIn()}</div>}</div> : 
                <div>{string && <div className="userError">{string}</div>}</div>}
            </div>
        </div>
    )
}

export default Signin
