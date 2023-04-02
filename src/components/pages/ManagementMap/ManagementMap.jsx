import React, { useEffect, useState } from "react";
import "./ManagementMap.css";
import { Fab } from "@mui/material";
import PolylineIcon from "@mui/icons-material/Polyline";
import ConstructionIcon from "@mui/icons-material/Construction";
import HistoryIcon from "@mui/icons-material/History";
import Map from "../../map/Map";
import NewSite from "../../../forms/NewStie/NewSite";

const TaskPage = (props) => {
  const [sites, SetSites] = useState([])
  const [isNewSiteFormOpen, setIsNewSiteFormOpen] = useState(false);
  const addArea = () => {
    console.log("add area");
  };

  const openNewSiteForm = () => {
    setIsNewSiteFormOpen(true);
  };
  const closeNewSiteForm = () => {
    setIsNewSiteFormOpen(false);
  };

  const addSite = (newSite) => {
    SetSites(prev => [...prev, newSite])
  }

  return (
    <div className="task-container">
      <Map sites={sites} />
      <NewSite isOpen={isNewSiteFormOpen} closeForm={closeNewSiteForm} addSite={addSite} />
      <div className="floating-actions">
        <Fab
          color="primary"
          aria-label="add"
          className="floating-button"
          onClick={openNewSiteForm}
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
