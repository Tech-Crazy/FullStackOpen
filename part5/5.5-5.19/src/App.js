import React, {useState, useEffect} from 'react';
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import useField from './hooks/UseField'

function App() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState(null)
  const userName = useField('text')
  const passWord = useField('password')

  const blogFormRef = React.createRef()

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
          Username: <input type = {userName.type} value = {userName.value} name = "Username" onChange = {userName.onChange} />
        </label>
        <br />
        <label>
          Password: <input type = {passWord.type} value = {passWord.value} name = "Password" onChange = {passWord.onChange} />
        </label>
        <br />
        <button type = 'submit'>Login</button>
      </form> 
    </>
  )
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username: userName.value, password: passWord.value})
      blogService.setToken(user.token)
      setUser(user)
      userName.reset()
      passWord.reset()
    }
    catch(exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const blogRef = React.createRef()

  const addBlog = event => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const newBlog = {
      title: title,
      author: author,
      url: url,
      username: userName.value
    }
    blogService.create(newBlog)
    .then(addedBlog => {
      setBlogs(blogs.concat(addedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      blogRef.current.setSuccess(`A new blog ${title} by ${author} was successfully added!`)
      setTimeout(() => blogRef.current.setSuccess(null), 5000)
    })
    .catch(error => console.log(error))
  }

  const handleLogout = () => {
    setUser(null)
  }

  const handleTitle = event => {
    setTitle(event.target.value)
  }

  const handleAuthor = event => {
    setAuthor(event.target.value)
  }

  const handleUrl = event => {
    setUrl(event.target.value)
  }
  return (
    <div className="App">
      <h1>Blog Viewer</h1>
      <Notification error = {errorMessage} />
      {user === null? loginForm(): 
      <Togglable>
        <BlogForm ref = {blogRef} user = {user} title = {title} author = {author} url = {url} onSubmit = {addBlog} handleTitle = {handleTitle} handleAuthor = {handleAuthor} handleUrl = {handleUrl} handleLogut = {handleLogout} blogsToShow = {blogsToShow} />
      </Togglable>}
      {blogsToShow}
      <button onClick = {handleLogout}>Logout</button>
    </div>
  );
}

export default App;
