import './App.css';
import Header from './components/header/Header';
import Login from './components/pages/login/Login';
import Main from './components/pages/main/Main';
import { useLocation } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Forgot from './components/pages/login/forgot/Forgot';
import Guides from './components/pages/guides/Guides';

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
      </Routes>
    </div>
  );
}

export default App;
