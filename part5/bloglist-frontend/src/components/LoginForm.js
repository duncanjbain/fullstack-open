import React from 'react'

const LoginForm = ({ handleLogin, username, password, handleUserNameChange, handlePasswordChange }) => {
  return (
    <section>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
      Username: <input type="text" name="username" value={username} onChange={handleUserNameChange} />
        </div>
        <div>
      Password: <input type="password" name="password" value={password} onChange={handlePasswordChange} />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </section>
  )
}

export default LoginForm