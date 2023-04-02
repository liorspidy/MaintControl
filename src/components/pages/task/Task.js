import React, { useState } from 'react';
import Maps from './map/Maps';
import './Task.css';
import tasks from './tasks.json';
import PrevTasksTable from './PrevTasksTable';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Map from "../../map/Map";

const Task = (props) => {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [editTaskClicked, setEditTaskClicked] = useState(false);
  const [locationName, setLocationName] = useState('');
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return '#ffa500';
      case 'In Progress':
        return '#1e90ff';
      case 'Finished':
        return '#008000';
      case 'Cancelled':
        return '#ff0000';
      default:
        return '#000';
    }
  };

  const sortedTasks = tasks.sort((a, b) => {
    return a.product_serial_number.localeCompare(b.product_serial_number);
  });

  const taskPositionHandler = (task) => {
    if (!editTaskClicked) {
      setSelectedPosition({
        lat: task?.location?.lat,
        lon: task?.location?.lon,
      });
    } else {
      navigate(`${currentUrl}/edit/${task.task_id}`);
    }
  };

  const currentUrl = window.location.pathname;

  const fillTaskFormHandler = (task, event) => {
    event.stopPropagation();
    navigate(`${currentUrl}/fill/${task.task_id}`);
  };

  const editTaskHandler = () => {
    setEditTaskClicked((prevState) => {
      return (prevState = !prevState);
    });
  };

  const editTaskClickedClass = editTaskClicked ? 'info' : 'white';

  return (
    <div className="taskPageBox">
      <div className="tasksList">
        <div className="actionBtns">
          <Fab size="small" color="white" aria-label="add">
            <DeleteIcon />
          </Fab>
          <Fab
            size="small"
            color={editTaskClickedClass}
            aria-label="add"
            onClick={editTaskHandler}
          >
            <EditIcon />
          </Fab>
          <Link className="newMission" to={`${currentUrl}/addTask`}>
            <Fab size="small" color="white" aria-label="add">
              <AddIcon />
            </Fab>
          </Link>
        </div>
        {sortedTasks.length > 0 && (
          <ul>
            {sortedTasks &&
              sortedTasks.map((task, index) => (
                <li
                  className="taskItem"
                  key={index}
                  onClick={taskPositionHandler.bind(this, task)}
                >
                  <div className="taskCard">
                    <div className="product">
                      <p className="taskTitle">Product:</p>
                      <div className="taskProductDetails">
                        <h3>{task.product_type}</h3>
                        <p className="tasksSerialNumber">
                          {task.product_serial_number}
                        </p>
                      </div>
                    </div>
                    <div className="problem">
                      <p className="taskTitle">Problem:</p>
                      <p className="taskProblemContent">{task.problem}</p>
                    </div>
                    <div className="lastUpdated">
                      <p className="taskTitle">Last Updated:</p>
                      <p>{task.date_updated}</p>
                    </div>
                    <div className="status">
                      <div
                        className="fillTaskForm"
                        onClick={fillTaskFormHandler.bind(this, task)}
                      >
                        <AssignmentIcon />
                      </div>
                      <div
                        className="statusBall"
                        style={{ backgroundColor: getStatusColor(task.status) }}
                        title={task.status}
                      ></div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        )}
        {sortedTasks.length === 0 && (
          <p className="noTasks">No Tasks Yet....</p>
        )}
      </div>
      <div className="mapsBox">
        <Maps
          selectedPosition={selectedPosition}
          locationName={locationName}
          setLocationName={setLocationName}
        />
        <div className="prevTasksTable">
          <PrevTasksTable />
        </div>
      </div>
    </div>
  );
};

export default Task;
