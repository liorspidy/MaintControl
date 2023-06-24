import React, { useState } from "react";
import { Modal, TextField, Button } from "@mui/material";
import Map from "../../components/map/Map";
import DrawableMap from "../../components/drawableMap/DrawableMap";
import "./NewSite.css";

const NewSite = ({ open, onClose, onSave }) => {
  const [siteName, setSiteName] = useState("asdas");
  const [siteDescription, setSiteDescription] = useState("aaaa");
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
    // onSave(newSite);
    // onClose();
    console.log("save site", newSite);
  };

  const handleSavePolygon = (lat, lng) => {
    setSitePolygonPoints([...sitePolygonPoints, [lat, lng]]);
  };

  const removePoint = () => {
    setSitePolygonPoints(sitePolygonPoints.slice(0, -1));
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
          <DrawableMap
            onSave={handleSavePolygon}
            polygon={sitePolygonPoints}
            setPolygon={handleSavePolygon}
            removePoint={removePoint}
          />
        </div>
      </div>
    </Modal>
  );
};

export default NewSite;
