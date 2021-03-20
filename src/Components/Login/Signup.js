import React, {useState, useContext} from 'react'
import axios from 'axios'
import SignupForm from './SignupForm'
import {UsernameContext} from '../../UsernameContext'


function Signup() {
    const {setUser} = useContext(UsernameContext)

    const [string, setString] = useState('')
    const fn = async({username, password, email}) => {
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
            setUser(res.data.username)
            // props.helper({
            // loggedInBool: true
            // })
            return res.data
        })
        setString(test.message)
        //console.log(test.message)
        //Created user
    }


    return (
        <div>
            <div>
                <div className="header-signup">Create an Account:</div>
                <SignupForm helper={fn}/>
                {string.substring(0, 17)==='Signup successful' || string===''? 
                <div>{string && <div className="userSuccess">{string}</div>}</div> : 
                <div>{string && <div className="userError">{string}</div>}</div>}
            
            </div>
        </div>
    )
}

export default Signup
