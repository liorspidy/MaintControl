import React, { useState } from "react";
import "./taskPage.css";
import { Fab } from "@mui/material";
import PolylineIcon from "@mui/icons-material/Polyline";
import ConstructionIcon from "@mui/icons-material/Construction";
import HistoryIcon from "@mui/icons-material/History";
import Map from "../../map/Map";

const TaskPage = (props) => {
  const addArea = () => {
    console.log("add area");
  };
  return (
    <div className="taskContainer">
      <Map />
      <div className="floating-actions">
        <Fab
          color="primary"
          aria-label="add"
          className="floating-button"
          onClick={addArea}
        >
          <PolylineIcon />
        </Fab>

        <Fab
          color="primary"
          aria-label="add"
          className="floating-button"
          onClick={addArea}
        >
          <ConstructionIcon />
        </Fab>

        <Fab
          color="primary"
          aria-label="add"
          className="floating-button"
          onClick={addArea}
        >
          <HistoryIcon />
        </Fab>
      </div>
    </div>
  );
};

export default TaskPage;
