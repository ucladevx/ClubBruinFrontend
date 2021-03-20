import React, {useState} from 'react'

function SignupForm(props) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const handleUsername = e => {
        setUsername(e.target.value)
    }

    const handlePassword = e => {
        setPassword(e.target.value)
    }

    const handleEmail = e => {
        setEmail(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        // props.helper(username, password, email)
        props.helper({
            username: username,
            password: password,
            email: email
        })
        setUsername('')
        setPassword('')
        setEmail('')
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
                type='text'
                onChange={handlePassword}
                value={password}
            />
            <input 
                className="logininput"
                placeholder='Enter UCLA email'
                text='text'
                onChange={handleEmail}
                value={email}
            />
            <div className="submitButton"> 
                <button type='submit' className="loginbutton">Sign up</button> 
            </div>
        </form>
        </div>
    )
}

export default SignupForm
