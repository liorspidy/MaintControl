import "./App.css";
import Header from "./components/header/Header";
import Login from "./components/pages/login/Login";
import Main from "./components/pages/main/Main";
import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Forgot from "./components/pages/login/forgot/Forgot";
import Task from "./components/pages/task/Task";
import Guides from "./components/pages/guides/Guides";
import AddGuide from "./components/pages/guides/addGuide/AddGuide";
import EditGuide from "./components/pages/guides/editGuide/EditGuide";
import GuideDetails from "./components/pages/guides/GuideDetails";
import CartProvider from "./store/CartProvider";
import Admin from "./components/pages/admin/Admin";

function App() {
  const location = useLocation().pathname.replace("/", "");

  return (
    <CartProvider>
      <div className="App">
        <Header location={location} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot" element={<Forgot />} />
          <Route path="task" element={<Task />} />
          <Route path="guides" element={<Guides />} />
          <Route path="guides/addGuide" element={<AddGuide />} />
          <Route path="guides/editGuide/:guideId" element={<EditGuide />} />
          <Route path="guides/details/:guideId" element={<GuideDetails />} />
          <Route path="admin" element={<Admin />} />
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;
