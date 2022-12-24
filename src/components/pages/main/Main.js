import { Link } from 'react-router-dom';
import './Main.css';

const Main = (props) => {
  return (
    <div>
      <h1 className="title">Welcome to MaintControl</h1>
      {/* <button className="loginButton"> */}
      <Link className="loginButton" to="login">
        Login Page
      </Link>
      {/* </button> */}
    </div>
  );
};

export default Main;
