import './App.css';
import Header from './components/header/Header';
import Login from './components/pages/login/Login';
import Main from './components/pages/main/Main';
import { useLocation } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Forgot from './components/pages/login/forgot/Forgot';
import Tasks from './components/pages/task/Tasks';
import ManagementMap from './components/pages/ManagementMap/ManagementMap';
import Guides from './components/pages/guides/Guides';
import AddGuide from './components/pages/guides/addGuide/AddGuide';
import EditGuide from './components/pages/guides/editGuide/EditGuide';
import GuideDetails from './components/pages/guides/GuideDetails';
import CartProvider from './store/CartProvider';
import Admin from './components/pages/users/admin/Admin';
import Missions from './components/pages/missions/Missions';
import NewMission from './components/pages/missions/NewMission';
import AddUser from './components/pages/users/admin/addUser/AddUser';
import EditUser from './components/pages/users/admin/editUser/EditUser';
import ShowUser from './components/pages/users/admin/showUser/ShowUser';
import EditMission from './components/pages/missions/EditMission';
import TaskEditForm from './components/pages/task/TaskEditForm';
import TaskAddForm from './components/pages/task/TaskAddForm';
import FillTask from './components/pages/task/fillTask/FillTask';
import { useContext, useState } from 'react';
import CartContext from './store/cart-context';

function App() {
  const location = useLocation().pathname.replace('/', '');
  const [guides, setGuides] = useState([]);
  const { user } = useContext(CartContext);

  return (
    <CartProvider>
      <div className="App">
        <Header location={location} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot" element={<Forgot />} />
          <Route path="task" element={<Tasks />} />
          <Route
            path="task/mission/:missionId/fill/:taskId"
            element={<FillTask />}
          />
          <Route path="map" element={<ManagementMap />} />
          <Route path="task/mission/:missionId" element={<Tasks />} />
          <Route
            path="task/mission/:missionId/addTask"
            element={<TaskAddForm />}
          />
          <Route
            path="task/mission/:missionId/edit/:taskId"
            element={<TaskEditForm />}
          />
          <Route path="missions" element={<Missions />} />
          <Route path="missions/newMission" element={<NewMission />} />
          <Route path="missions/edit/:missionId" element={<EditMission />} />
          <Route
            path="guides"
            element={<Guides guides={guides} setGuides={setGuides} />}
          />
          <Route path="guides/addGuide" element={<AddGuide />} />
          <Route path="guides/editGuide/:guideId" element={<EditGuide />} />
          <Route
            path="guides/details/:guideId"
            element={<GuideDetails guides={guides} />}
          />
          <Route path="admin" element={<Admin />} />
          <Route path="admin/addUser" element={<AddUser />} />
          <Route path="admin/editUser/:userId" element={<EditUser />} />
          <Route path="admin/showUser/:userId" element={<ShowUser />} />
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;
