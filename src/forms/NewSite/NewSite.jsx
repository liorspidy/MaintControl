import { Button, Modal, TextField } from "@mui/material";
import React, { useState } from "react";
import { ChromePicker } from "react-color";
import DrawableMap from "../../components/drawableMap/DrawableMap";
import "./NewSite.css";

const NewSite = ({ open, onClose, onSave }) => {
  const [siteName, setSiteName] = useState("asdas");
  const [siteDescription, setSiteDescription] = useState("aaaa");
  const [sitePolygonPoints, setSitePolygonPoints] = useState([
    [32.020475541187324, 34.77642883295172],
    [32.02262346836834, 34.76722570107131],
    [32.017235352368665, 34.76677519811213],
  ]);
  const [siteColor, setSiteColor] = useState("#ff0000");

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
      sitePolygonPoints,
      siteMarkers: [],
      siteColor,
    };
    onSave(newSite);
    onClose();
    console.log("save site", newSite);
  };

  const addPoint = (lat, lng) => {
    setSitePolygonPoints([...sitePolygonPoints, [lat, lng]]);
  };

  const removePoint = () => {
    setSitePolygonPoints(sitePolygonPoints.slice(0, -1));
  };

  const handleColorChange = (color) => {
    setSiteColor(color.hex);
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
            Color
            <ChromePicker
              color={siteColor}
              onChangeComplete={handleColorChange}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              className="new-site-form-button"
              disabled={
                !siteName || !siteDescription || sitePolygonPoints.length < 3
              }
            >
              Save
            </Button>
          </div>
        </div>
        <div className="new-site-modal-map">
          <DrawableMap
            polygon={sitePolygonPoints}
            addPoint={addPoint}
            removePoint={removePoint}
            siteColor={siteColor}
          />
        </div>
      </div>
    </Modal>
  );
};

export default NewSite;
