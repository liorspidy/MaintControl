import React, { useState } from "react";
import { Modal, TextField, Button } from "@mui/material";
import Map from "../../components/map/Map";
import "./NewSite.css";

const NewSite = ({ open, onClose, onSave }) => {
  const [siteName, setSiteName] = useState("amit");
  const [siteDescription, setSiteDescription] = useState("desc");
  const [sitePolygonPoints, setSitePolygonPoints] = useState([]);

  const handleSiteNameChange = (event) => {
    setSiteName(event.target.value);
  };

  const handleSiteDescriptionChange = (event) => {
    setSiteDescription(event.target.value);
  };

  const handleSave = () => {
    const newSite = {
      siteName,
      siteDescription,
      sitePoints: sitePolygonPoints,
    };
    onSave(newSite);
    // onClose();
    console.log("save site", newSite);
  };

  const handlePolygonPointsChange = (newPolygonPoints) => {
    console.log("new point in polygon", newPolygonPoints);
    setSitePolygonPoints(newPolygonPoints);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="new-site-modal-container">
        <div className="new-site-modal-form">
          <h2>New Site</h2>
          <div className="new-site-form-body">
            <TextField
              label="Site Name"
              value={siteName}
              onChange={handleSiteNameChange}
            />
            <TextField
              label="Site Description"
              value={siteDescription}
              onChange={handleSiteDescriptionChange}
              multiline
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              className="new-site-form-button"
              // disabled={!siteName || !siteDescription || sitePolygonPoints.length === 0}
            >
              Save
            </Button>
          </div>
        </div>
        <div className="new-site-modal-map">
          <Map editable onPolygonPointsChange={handlePolygonPointsChange} />
        </div>
      </div>
    </Modal>
  );
};

export default NewSite;
