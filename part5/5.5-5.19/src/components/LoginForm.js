import React, {useState} from 'react'
import loginService from '../services/login'

const loginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
          const user = await loginService.login({username, password})
          setUsername('')
          setPassword('')
        }
        catch(exception) {
          setErrorMessage('Wrong credentials')
          setTimeout(setErrorMessage(null), 5000)
        }
    }
    return (
        <>
            <h2>Login to application!</h2>
            <form onSubmit = {handleLogin}>
                <label>
                    Username: <input type = "text" value = {username} name = "Username" onChange = {({target}) => setUsername(target.value)} />
                </label>
                <label>
                    Password: <input type = "password" value = {password} name = "Password" onChange = {({target}) => setPassword(target.value)} />
                </label>
                <button type = 'submit'>Login</button>
            </form> 
        </>
    )
}