import './App.css';
import Header from './components/header/Header';
import Login from './components/pages/login/Login';
import Main from './components/pages/main/Main';
import { useLocation } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Forgot from './components/pages/login/forgot/Forgot';
import Guides from './components/pages/guides/Guides';
import AddGuide from './components/pages/guides/addGuide/AddGuide';
import EditGuide from './components/pages/guides/editGuide/EditGuide';

function App() {
  const location = useLocation().pathname.replace('/', '');

  return (
    <div className="App">
      <Header location={location} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="login" element={<Login />} />
        <Route path="forgot" element={<Forgot />} />
        <Route path="guides" element={<Guides />} />
        <Route path="guides/addGuide" element={<AddGuide />} />
        <Route path="guides/editGuide/:guideId" element={<EditGuide />} />
      </Routes>
    </div>
  );
}

export default App;
