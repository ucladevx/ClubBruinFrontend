import React, {useState, useContext} from 'react'
import './index.css'
import Signin from './Signin'
import Signup from './Signup'
import { useHistory } from "react-router-dom";

function Login(props) {
    const history = useHistory()
    // const {user, setUser} = useContext(UsernameContext)
    // console.log(user)

    const [isSignin, setIsSignin] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false)
    
    const clickSignin = () => {
        setIsSignin(true)
    }

    const clickSignup = () => {
        setIsSignin(false)
    }

    const loginbool = (loggedInBool) => {
        setLoggedIn(loggedInBool)
    }

    if (loggedIn || sessionStorage.getItem("loginToken") == "true") {
        history.push('/map')
        // window.location = "/chat"
        return null
    }


    return (

        <div>
            {isSignin?
            
                <div className="container-signin">
                    <div className="login-components">
                        <img className="logo-image" src="/assets/club_bruin_logo.png" alt="logo"></img>
                        <Signin helper={loginbool} />
                        <div className="change-to-signup">Don't have an account?<button className="change-to-signup-button" onClick={clickSignup}>Sign up!</button></div>
                    </div>
                </div> :

                <div className="container-signup">
                    <div className="login-components">
                        <img className="logo-image" src="/assets/club_bruin_logo.png" alt="logo"></img>
                        <Signup />
                        <div className="change-to-signin">Already have an account?<button className="change-to-signin-button" onClick={clickSignin}>Sign in!</button></div>
                    </div>
                </div>

            }       
        </div>        
        
    )
}

export default Login
