import React, { useState, useEffect } from "react";
import DisplayBlogs from "./components/DisplayBlogs";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification"
import blogService from "./services/blogs";
import loginService from "./services/login";


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notitficationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState("");

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
      setUser(userToLogin);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleUserNameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <div>
            <Notification message={notitficationMessage} type={notificationType} />
      <header>
        <h1>Blog App</h1>
      </header>
      {user === null && <LoginForm
        handleLogin={handleLogin}
        username={username}
        password={password}
        handleUserNameChange={handleUserNameChange}
        handlePasswordChange={handlePasswordChange}
      /> }
      {user !== null && <h2>Welcome, {user.username}!</h2>}
      <h2>blogs</h2>
      {user !== null && <DisplayBlogs blogs={blogs} /> }
    </div>
  );
};

export default App;
