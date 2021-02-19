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
        <div className="form-signin">
            <form onSubmit={handleSubmit}>
            username
            <input 
                className="input-signin"
                type='text'
                onChange={handleUsername}
                value={username}
            />
            password
            <input 
                className="input-signin"
                type='password'
                onChange={handlePassword}
                value={password}
            />
            <div className="submit-button"> 
                <button type='submit' className="login-button">Sign In</button> 
            </div>
            </form>
        </div>
    )
}

export default SigninForm
