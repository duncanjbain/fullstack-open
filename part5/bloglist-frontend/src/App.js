import React, { useState, useEffect } from "react";
import DisplayBlogs from "./components/DisplayBlogs";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import AddBlogForm from "./components/AddBlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notitficationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogUrl, setBlogUrl] = useState("");



  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogUser')
    if(loggedUserJSON) {
      console.log(loggedUserJSON)
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleErrorNotification = (message) => {
    setNotificationType("error");
    setNotificationMessage(message);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

  const handleSuccessNotification = (message) => {
    setNotificationType("success");
    setNotificationMessage(message);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userToLogin = await loginService.login({ username, password });
      window.localStorage.setItem(
        'loggedInBlogUser', JSON.stringify(userToLogin)
      ) 
      blogService.setToken(userToLogin.token)
      setUser(userToLogin);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleBlogAdd = async (event) => {
    event.preventDefault();
    const newBlog = { title: blogTitle, author: blogAuthor, url: blogUrl}
    const authToken = user.token
    console.log(authToken)
      await blogService.addBlog(newBlog, authToken)
  }

  const handleBlogAuthorChange = (event) => {
    setBlogAuthor(event.target.value);
  };
  const handleBlogTitleChange = (event) => {
    setBlogTitle(event.target.value);
  };
  const handleBlogUrlChange = (event) => {
    setBlogUrl(event.target.value);
  };

  const handleUserNameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


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
      {user !== null && <AddBlogForm
        blogTitle={blogTitle}
        blogAuthor={blogAuthor}
        blogUrl={blogUrl}
        handleBlogAuthorChange={handleBlogAuthorChange}
        handleBlogTitleChange={handleBlogTitleChange}
        handleBlogUrlChange={handleBlogUrlChange}
        handleBlogAdd={handleBlogAdd}
      />}
      <h2>blogs</h2>
      {user !== null && <DisplayBlogs blogs={blogs} />}
    </div>
  );
};

export default App;
