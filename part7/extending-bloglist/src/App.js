import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginError from './components/LoginError'
import { loginUser } from './reducers/userReducer'
import { connect } from 'react-redux'

const LoginForm = props => {
  const handleEmail = (event) => {
    event.preventDefault()
    props.setEmail(event.target.value)
  }
  const handlePassword = (event) => {
    event.preventDefault()
    props.setPassword(event.target.value)
  }
  return (
    <form onSubmit = {props.handleLogin}>
      <label>
        Username
        <input type = "email" key = 'email1' value = {props.email} onChange = {handleEmail} />
      </label>
      <br />
      <label>
        Password
        <input type = "password" key = "password1" value = {props.password} onChange = {handlePassword} />
      </label>
      <br />
      <button type = "submit">Login</button>
    </form>
  )
}


const App = props => {
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState(null)

  const handleLogin = async () => {
    const credentials = {
      email: email,
      password: password
    }
    console.log("Inside handleLogin")
    const data = await props.loginUser(credentials)
    console.log(data)
    console.log(props.user)
    if (data === "ERROR") {
      setLoginError("Bad login! Please try again")
      setTimeout(() => setLoginError(null), 5000)
    }
    else {
      setUser(props.user)
      setEmail('')
      setPassword('')
    }
  }

  return (
    <>
      <h1>Blogs</h1>
      <LoginError message = {loginError} />
      {user? <h1>You logged in</h1>: <LoginForm email = {email} password = {password} setEmail = {setEmail} setPassword = {setPassword} handleLogin = {handleLogin} />}
      <Footer />
    </>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = {
  loginUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App) 