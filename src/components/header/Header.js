import './Header.css';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import AccountMenu from '../menuComp/AccountMenu';

const Header = (props) => {
  const pageNameHandler = (pageName) => {
    switch (pageName) {
      case 'login':
        return 'Login Page';
      case '':
        return 'Main Page';
      case 'forgot':
        return 'Password Reset';
      case 'guides':
        return 'Guides Page';
      default:
        return 'Unknown Page';
    }
  };

  return (
    <div className="header">
      <div className="buttonsContent">
        <AccountMenu icon={MenuIcon} />
        <div className="searchBarContent">
          <SearchIcon
            className="Icon searchIcon"
            onClick={(event) =>
              event.currentTarget.nextSibling.firstChild.focus()
            }
          />
          <TextField
            className="searchBar"
            id="outlined-basic"
            label="Search"
            variant="filled"
            size="small"
          />
        </div>
      </div>
      <div className="pageName">{pageNameHandler(props.location)}</div>
      <div className="logoBox">
        <Link to="/">
          <img className="logo" src={Logo} alt="logo" />
        </Link>
      </div>
    </div>
  );
};

export default Header;