import React, { useEffect, useState } from "react";
import "./NewSite.css";

import Modal from "@mui/material/Modal";
import DrawableMap from "../../components/drawableMap/DrawableMap";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const NewSite = ({ isOpen, closeForm }) => {
  const [mapLayers, setMapLayers] = useState([]);
  // const [siteName, setSiteName] = usestate("");

  const saveData = () => {
    console.log("data to save is", { points: mapLayers });
  };
  return (
    <div>
      <Modal open={isOpen} onClose={closeForm}>
        <div className="new-site-modal-container">
          <div className="new-site-modal-form">
            <h2>New Site Form</h2>
            <div className="new-site-form-body">
              <TextField
                id="outlined-basic"
                label="Site Name"
                variant="outlined"
              />

              <TextField
                id="outlined-multi-basic"
                label="Site Description"
                variant="outlined"
                multiline
                rows={4}
              />
            </div>
            <Button
              variant="contained"
              onClick={saveData}
              className="new-site-form-button"
            >
              Save Data
            </Button>
          </div>
          <div className="new-site-modal-map">
            <DrawableMap mapLayers={mapLayers} setMapLayers={setMapLayers} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NewSite;
