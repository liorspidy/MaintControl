import { Link } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
    return (
      
        <div className="adminButtons">
        <Link className="admin-button btnAddUser" to="login">
          Add a new user
        </Link>

        <Link className="admin-button btnEditUserBtn" to="login">
        Edit a user
        </Link>

        <Link className="admin-button btnDeleteUser" to="login">
        Delete a user
        </Link>
        </div>
      

    );
  };
  
  export default Admin;
