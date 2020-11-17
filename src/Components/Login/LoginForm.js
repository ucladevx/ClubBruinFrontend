import React, {useState} from 'react'

function LoginForm(props) {

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
        <div>
        <form onSubmit={handleSubmit}>
            <input 
                placeholder='Enter username'
                type='text'
                onChange={handleUsername}
                value={username}
            />
            <input 
                placeholder='Enter password'
                type='text'
                onChange={handlePassword}
                value={password}
            />
            <input 
                placeholder='Enter UCLA email'
                text='text'
                onChange={handleEmail}
                value={email}
            />
            <input className="submitForm" type='submit' value='Sign up'></input>
        </form>
        </div>
    )
}

export default LoginForm
