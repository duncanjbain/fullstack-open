import React, { useState, useEffect, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import DisplayBlogs from './components/DisplayBlogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import AddBlogForm from './components/AddBlogForm'
import Toggleable from './components/Toggleable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notitficationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('')

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const blogsSortedByLikes = [...blogs].sort((a, b) => b.likes - a.likes)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogUser')
    if (loggedUserJSON) {
      console.log(loggedUserJSON)
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleErrorNotification = (message) => {
    setNotificationType('error')
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const handleSuccessNotification = (message) => {
    setNotificationType('success')
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userToLogin = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedInBlogUser',
        JSON.stringify(userToLogin)
      )
      blogService.setToken(userToLogin.token)
      setUser(userToLogin)
      setUsername('')
      setPassword('')
    } catch (exception) {
      handleErrorNotification('Wrong username or password entered!')
    }
  }

  const BlogFormRef = useRef()
  const BlogForm = () => (
    <Toggleable buttonLabel="New blog" ref={BlogFormRef}>
      <AddBlogForm handleBlogAdd={handleBlogAdd} />
    </Toggleable>
  )

  const handleBlogAdd = async (newBlog) => {
    const authToken = user.token
    await blogService.addBlog(newBlog, authToken)
    console.log(BlogFormRef)
    BlogFormRef.current.toggleVisibility()
    handleSuccessNotification(
      `Great, a new blog titled ${newBlog.title} has been added!`
    )
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }

  const handleLike = useCallback(
    async (event, blogId) => {
    event.preventDefault()
    const blogToLike = blogs.find((blog) => blog.id=== blogId)
    const updatedBlog = {
      ...blogToLike,
      likes: blogToLike.likes +1,
    }
    console.log(updatedBlog)
    setBlogs(blogs.map((blog) => (blog.id !== blogId ? blog : updatedBlog)))
    try {
      await blogService.addLike(blogId, updatedBlog.likes)
    } catch(error) {
      console.log(error)
    }
  },[blogs]);

  const handleDelete = (event) => {
    if(window.confirm('Are you sure you want to delete this blog?')) {
      event.preventDefault()
      /* blogService.deleteBlog(blog.id) */
    }
  } 


  const handleUserNameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <div>
      <Notification message={notitficationMessage} type={notificationType} />
      <header>
        <h1>Blog App</h1>
      </header>
      {user === null && (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUserNameChange={handleUserNameChange}
          handlePasswordChange={handlePasswordChange}
        />
      )}
      {user !== null && <h2>Welcome, {user.username}!</h2>}
      {user !== null && <BlogForm />}
      <h2>blogs</h2>
      {user !== null && <DisplayBlogs blogs={blogsSortedByLikes} handleLike={handleLike} handleDelete={handleDelete} />}
    </div>
  )
}


Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default App
