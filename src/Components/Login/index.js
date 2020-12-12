import React, {useState, useContext} from 'react'
import './index.css'
import Signin from './Signin'
import Signup from './Signup'
import {UsernameContext} from '../../UsernameContext'

function Login(props) {
    const {user, setUser} = useContext(UsernameContext)
    console.log(user)

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




    if (loggedIn) {
        window.location = "/chat"
        return null
    }


    return (
        <div className="containerlogin">
            
            {/* Right now the "home page" is just text, but I assume later that when the user
            logs in successfully, they will be taken to an actual home page instead of staying 
            on the login page */}

            {loggedIn? <div className="header">home</div> :
            
            <div>
                <div className="loginContainer">
                    {isSignin? <Signin helper={loginbool}/> : <Signup />}

                    <div>
                        {isSignin?
                        <button className="loginbutton" onClick={clickSignup}>Don't have an account? Sign up!</button> : 
                        <button className="loginbutton" onClick={clickSignin}>Already have an account? Sign in!</button>}
                    </div>

                </div>
            </div>
            }

        </div>
                    
        
    )
}

export default Login
