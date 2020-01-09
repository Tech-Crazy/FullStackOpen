import React, {useImperativeHandle, useState} from 'react'
import PropTypes from 'prop-types'
import SuccessMessage from './successblog'

const BlogForm = React.forwardRef(({user, title, author, url, onSubmit, handleTitle, handleAuthor, handleUrl, handleLogout, blogsToShow}, ref) => {

    const [success, setSuccess] = useState(null)

    useImperativeHandle(ref, () => {
        return setSuccess
    })

    return (
        <>
            <p>Logged in as {user.name}</p>
            <SuccessMessage message = {success} />
            <h2>Create new</h2>
            <form onSubmit = {onSubmit}>
                <label>
                Title: <input type = "text" name = "title" value = {title} onChange = {handleTitle}/>
                </label>
                <br />
                <label>
                Author: <input type = "text" name = "Author" value = {author} onChange = {handleAuthor}/>
                </label>
                <br />
                <label>
                URL: <input type = "text" name = "URL" value = {url} onChange = {handleUrl}/>
                </label>
                <br />
                <button type = "submit">Create</button>
            </form>
            <h3>Blogs</h3>
            <ul>
                {blogsToShow}
            </ul>
            <button onClick = {handleLogout}>Logout</button>
        </>
    )
})

BlogForm.propTypes = {
    handleTitle: PropTypes.func.isRequired,
    handleAuthor: PropTypes.func.isRequired,
    handleUrl: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
}

export default BlogForm