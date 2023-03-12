import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import "./AddUser.css";
import axios from "axios";

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

const AddUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // new state to track whether to show or hide the password
  const [companyId, setCompanyId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  //const [isValidEmail, setIsValidEmail] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [authorization, setAuthorization] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCompanyIdChange = (event) => {
    setCompanyId(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    //setIsValidEmail(validateEmail(event.target.value));
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleAuthorizationChange = (event) => {
    setAuthorization(event.target.value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword); // toggle showPassword state
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
    } else if (username.length < 4) {
      setError("Username must be at least 4 characters");
    } else if (companyId.length == 0) {
      setError("Must enter company ID");
    } else if (firstName.length < 2) {
      setError("First name must be at least 2 characters");
    } else if (lastName.length < 2) {
      setError("Last name must be at least 2 characters");
    } else if (phoneNumber.length != 10) {
      /*else if (!isValidEmail) {
        setError('Must enter a valid Email');
    }*/
      setError("Must enter a valid phone number");
    } else if (document.getElementById("authorization").value === "choose") {
      setError("Must choose an authorization");
    } else {
      // submit the form
      console.log("submitted!");
      axios
        .post("http://localhost:9000/login", {
          username,
          password,
          firstName,
          lastName,
          companyId,
          email,
          phoneNumber,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      setError("");
    }
    navigate("/admin");
  };

  return (
    <div className="addUserBox">
      <form onSubmit={handleSubmit} className="addUserForm">
        <div className="addUserFormContent">
          <label className="addUserLabel" htmlFor="username">
            Username:
            <input
              id="username"
              className="addUserInput"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </label>
          <br />
          <label className="addUserLabel" htmlFor="pass">
            Password:
            <div className="passContent">
              <input
                id="pass"
                className="addUserInput"
                type={showPassword ? "text" : "password"} // show text if showPassword is true, otherwise show password
                value={password}
                onChange={handlePasswordChange}
                required
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
          <label className="addUserLabel" htmlFor="firstName">
            First name:
            <input
              id="firstName"
              className="addUserInput"
              type="text"
              value={firstName}
              onChange={handleFirstNameChange}
              required
            />
          </label>
          <br />
          <label className="addUserLabel" htmlFor="LastName">
            Last name:
            <input
              id="lastName"
              className="addUserInput"
              type="text"
              value={lastName}
              onChange={handleLastNameChange}
              required
            />
          </label>
          <br />
          <label className="addUserLabel" htmlFor="Email">
            Email adress:
            <input
              id="email"
              className="addUserInput"
              type="text"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </label>
          <br />
          <label className="addUserLabel" htmlFor="phoneNumber">
            Phone number:
            <input
              id="phoneNumber"
              className="addUserInput"
              type="text"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              required
            />
          </label>
          <br />
          <label htmlFor="authorization" className="addUserLabel">
            Authorization:
            <select
              id="authorization"
              name="authorization"
              className="addUserInput"
              value={authorization}
              onChange={handleAuthorizationChange}
              required
            >
              <option value="choose">Choose authorization</option>
              <option value="admin">Admin</option>
              <option value="Mmanager">Manager</option>
              <option value="maintenanceMan">Maintenance man</option>
            </select>
          </label>
          <br />
          <label className="addUserLabel" htmlFor="companyId">
            Company ID:
            <input
              id="companyId"
              className="addUserInput"
              type="text"
              value={companyId}
              onChange={handleCompanyIdChange}
              required
            />
          </label>
        </div>
        <div className="addUserFormBtn">
          {error && <div className="addUserError">{error}</div>}
          <br />
          <button className="addUserButton" type="submit">
            Add a user
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
