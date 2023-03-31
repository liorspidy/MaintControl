import React, { useEffect, useState } from "react";
import "./NewSite.css";

import Modal from "@mui/material/Modal";
import DrawableMap from "../../components/drawableMap/DrawableMap";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const NewSite = ({ isOpen, closeForm, addSite }) => {
  const [mapLayers, setMapLayers] = useState([]);
  const [siteName, setSiteName] = useState("");
  const [siteDescription, setSiteDescription] = useState("");

  useEffect(() => {
    if (isOpen) {
      setMapLayers([]);
      setSiteName("test");
      setSiteDescription("zzzaaa");
    }
  }, [isOpen])

  const saveData = () => {
    addSite({ siteName, siteDescription, points: mapLayers })
    closeForm();
  };

  const siteNameChanged = (e) => {
    setSiteName(e.target.value)
  }
  const siteDescriptionChanged = (e) => {
    setSiteDescription(e.target.value)
  }

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
                value={siteName}
                onChange={siteNameChanged}
              />

              <TextField
                id="outlined-multi-basic"
                label="Site Description"
                variant="outlined"
                multiline
                rows={4}
                value={siteDescription}
                onChange={siteDescriptionChanged}
              />
            </div>
            <Button
              variant="contained"
              onClick={saveData}
              className="new-site-form-button"
              disabled={!(siteName.length > 0 && siteDescription.length > 0 && mapLayers.length > 0)}
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
