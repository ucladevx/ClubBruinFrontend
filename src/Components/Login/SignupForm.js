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
        <div className="form-signup">
        <form onSubmit={handleSubmit}>
            username
            <input 
                className="input-signup"
                type='text'
                onChange={handleUsername}
                value={username}
            />
            password
            <input 
                className="input-signup"
                type='text'
                onChange={handlePassword}
                value={password}
            />
            UCLA email address
            <input 
                className="input-signup"
                text='text'
                onChange={handleEmail}
                value={email}
            />
            <div className="submit-button"> 
                <button type='submit' className="login-button">Sign Up</button> 
            </div>
        </form>
        </div>
    )
}

export default SignupForm
