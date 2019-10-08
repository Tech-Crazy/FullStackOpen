import React, {useState, useEffect} from 'react';
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notification'
import SuccessMessage from './components/successblog'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState(null)
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    blogService.getAll()
    .then(reqBlogs => setBlogs(reqBlogs))
  }, [])

  const blogsToShow = blogs ? blogs.map(blog => <li key = {blog.id}>{blog.title} - {blog.author}</li>) : null

  const loginForm = () => (
    <>
      <h2>Login to application!</h2>
      <form onSubmit = {handleLogin}>
        <label>
          Username: <input type = "text" value = {username} name = "Username" onChange = {({target}) => setUsername(target.value)} />
        </label>
        <br />
        <label>
          Password: <input type = "password" value = {password} name = "Password" onChange = {({target}) => setPassword(target.value)} />
        </label>
        <br />
        <button type = 'submit'>Login</button>
      </form> 
    </>
  )
  const blogForm = () => (
    <>
      <p>Logged in as {user.name}</p>
      <SuccessMessage message = {success} />
      <h2>Create new</h2>
      <form onSubmit = {addBlog}>
        <label>
          Title: <input type = "text" name = "title" value = {title} onChange = {({target}) => setTitle(target.value)}/>
        </label>
        <br />
        <label>
          Author: <input type = "text" name = "Author" value = {author} onChange = {({target}) => setAuthor(target.value)}/>
        </label>
        <br />
        <label>
          URL: <input type = "text" name = "URL" value = {url} onChange = {({target}) => setUrl(target.value)}/>
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
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      blogService.setToken(user.token)
      console.log(user)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch(exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const addBlog = event => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
      username: user.username
    }
    blogService.create(newBlog)
    .then(addedBlog => {
      setBlogs(blogs.concat(addedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setSuccess(`A new blog ${title} by ${author} was successfully added!`)
      setTimeout(() => setSuccess(null), 5000)
    })
    .catch(error => console.log(error))
  }

  const handleLogout = () => {
    setUser(null)
  }
  return (
    <div className="App">
      <h1>Blog Viewer</h1>
      <Notification error = {errorMessage} />
      {user === null? loginForm(): blogForm()}
    </div>
  );
}

export default App;
