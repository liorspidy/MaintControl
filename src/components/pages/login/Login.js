import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './Login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [companyId, setCompanyId] = useState('');

  const [showPassword, setShowPassword] = useState(false); // new state to track whether to show or hide the password
  const [error, setError] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCompanyIdChange = (event) => {
    setCompanyId(event.target.value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword); // toggle showPassword state
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password.length === 0 && username.length === 0) {
      setError('Must enter Username and Password');
    } else if (password.length < 8 && password.length > 0) {
      setError('Password must be at least 8 characters');
    } else if (username.length < 4 && username.length > 0) {
      setError('Username must be at least 4 characters');
    } else {
      // submit the form
      console.log('submitted!');
      axios
        .post('http://localhost:9000/login', {
          username,
          password,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      setError('');
    }
  };

  return (
    <div className="loginBox">
      <form onSubmit={handleSubmit} className="loginForm">
        <label className="loginLabel" htmlFor="username">
          Username:
          <input
            id="username"
            className="loginInput"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </label>
        <br />
        <label className="loginLabel" htmlFor="pass">
          Password:
          <div className="passContent">
            <input
              id="pass"
              className="loginInput"
              type={showPassword ? 'text' : 'password'} // show text if showPassword is true, otherwise show password
              value={password}
              onChange={handlePasswordChange}
            />
            {showPassword && (
              <VisibilityIcon className="eye" onClick={handleShowPassword} />
            )}
            {!showPassword && (
              <VisibilityOffIcon
                className="eyeOff"
                onClick={handleShowPassword}
              />
            )}
          </div>
        </label>
        <br />
        <label className="loginLabel" htmlFor="companyId">
          Company ID:
          <input
            id="companyId"
            className="loginInput"
            type="text"
            value={companyId}
            onChange={handleCompanyIdChange}
          />
        </label>
        <br />
        {error && <div className="loginError">{error}</div>}
        <br />
        <Link to="/forgot">Forgot my password or username</Link>
        <br />
        <button className="loginButton" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
