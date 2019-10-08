import React from 'react'
import "../index.css"

const Notification = ({error}) => {
    if (error === null) {
        return null
    }
    else {
        return (
            <div className = "Error">
                {error}
            </div>
        )
    }
}

export default Notification