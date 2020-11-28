import React, {useState} from 'react'
import axios from 'axios'
import SignupForm from './SignupForm'

function Singup() {

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
            return res.data
        })
        setString(test.message)
        //console.log(test.message)
        //Created user
    }


    return (
        <div>
            <div>
                <div className="header">Sign Up:</div>
                <SignupForm helper={fn}/>
                {string.substring(0, 17)==='Signup successful' || string===''? 
                <div>{string && <div className="userSuccess">{string}</div>}</div> : 
                <div>{string && <div className="userError">{string}</div>}</div>}
            
            </div>
        </div>
    )
}

export default Singup
