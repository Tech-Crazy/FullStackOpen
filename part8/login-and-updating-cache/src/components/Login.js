import React, { useState } from 'react'


const LoginPage = props => {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async () => {
        const result = await props.login({
            variables: {username, password}
        })
        if (result) {
            const token = result.data.login.value
            props.setToken(token)
            localStorage.setItem('user-token', token)
        }
    }

    return (
        <form onSubmit = {handleSubmit}>
            <label>
                Username:
                <input type = "text" value = {username} onChange = {e => setUserName(e.target.value)} />
            </label>
            <label>
                Password:
                <input type = "password" value = {password} onChange = {e => setPassword(e.target.value)} />
            </label>
            <button type = "submit">login</button>
        </form>
    )
}

export default LoginPage