import { Link } from 'react-router-dom';
import './Main.css';

const Main = (props) => {
  return (
    <div>
      <h1 className="title">Welcome to MainControl</h1>
      <button className="loginButton">
        <Link className="loginLink" to="login">
          Login Page
        </Link>
      </button>
    </div>
  );
};

export default Main;
