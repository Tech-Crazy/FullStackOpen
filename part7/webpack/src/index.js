import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const hello = name => {
    console.log(`Hello ${name}`)
}

ReactDOM.render(<App />, document.getElementById('root'))