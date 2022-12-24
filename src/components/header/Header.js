import './Header.css';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Logo from '../../images/logo.png';

const Header = (props) => {
  return (
    <div className="header">
      <div className="buttonsContent">
        <MenuIcon className="Icon" />
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
      <div className="pageName">Log-In</div>
      <div className="logoBox">
        <img className="logo" src={Logo} alt="logo" />
      </div>
    </div>
  );
};

export default Header;
