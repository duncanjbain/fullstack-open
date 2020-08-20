import React, { useState, useEffect, useRef } from "react";
import DisplayBlogs from "./components/DisplayBlogs";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import AddBlogForm from "./components/AddBlogForm";
import Toggleable from "./components/Toggleable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notitficationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const blogsSortedByLikes = [...blogs].sort((a, b) => b.likes - a.likes);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInBlogUser");
    if (loggedUserJSON) {
      console.log(loggedUserJSON);
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

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
        "loggedInBlogUser",
        JSON.stringify(userToLogin)
      );
      blogService.setToken(userToLogin.token);
      setUser(userToLogin);
      setUsername("");
      setPassword("");
    } catch (exception) {
      handleErrorNotification("Wrong username or password entered!");
    }
  };

  const BlogFormRef = useRef();
  const BlogForm = () => (
    <Toggleable buttonLabel="New blog" ref={BlogFormRef}>
      <AddBlogForm handleBlogAdd={handleBlogAdd} />
    </Toggleable>
  );

  const handleBlogAdd = async (newBlog) => {
    const authToken = user.token;
    await blogService.addBlog(newBlog, authToken);
    console.log(BlogFormRef);
    BlogFormRef.current.toggleVisibility();
    handleSuccessNotification(
      `Great, a new blog titled ${newBlog.title} has been added!`
    );
    blogService.getAll().then((blogs) => setBlogs(blogs));
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
      {user !== null && <BlogForm />}
      <h2>blogs</h2>
      {user !== null && <DisplayBlogs blogs={blogsSortedByLikes} />}
    </div>
  );
};

export default App;
