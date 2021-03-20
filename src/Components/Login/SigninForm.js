import React, {useState} from 'react'

function SigninForm(props) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsername = e => {
        setUsername(e.target.value)
    }

    const handlePassword = e => {
        setPassword(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        props.helper({
            username: username,
            password: password,
        })
        setUsername('')
        setPassword('')
    }

    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
            <input 
                className="logininput"
                placeholder='Enter username'
                type='text'
                onChange={handleUsername}
                value={username}
            />
            <input 
                className="logininput"
                placeholder='Enter password'
                type='password'
                onChange={handlePassword}
                value={password}
            />
            <div className="submitButton"> 
                <button type='submit' className="loginbutton">Sign in</button> 
            </div>
            </form>
        </div>
    )
}

export default SigninForm
