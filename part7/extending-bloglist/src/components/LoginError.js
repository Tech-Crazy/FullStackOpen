import React from 'react'

const LoginError = ({message}) => {
    if (message) {
        return (
            <div className = "error">
                {message}
            </div>
        )
    }
    return null
}

export default LoginError