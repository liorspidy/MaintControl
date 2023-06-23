import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import MarkerMap from "../../components/markerMap/markerMap";
import "./NewEquipment.css";

const NewEquipment = ({ isOpen, closeForm, allSites, addEquipment }) => {
  const [mapLayers, setMapLayers] = useState([]);
  const [equipmentName, setEquipmentName] = useState("equipment");
  const [equipmentSite, setEquipmentSite] = useState("");

  useEffect(() => {
    if (isOpen) {
      setMapLayers([]);
      setEquipmentName("");
      setEquipmentSite("");
    }
  }, [isOpen]);

  const saveData = () => {
    const newEquipment = {
      equipmentName,
      site: equipmentSite,
      points: mapLayers,
    };
    addEquipment(newEquipment);
    closeForm();
  };

  const handleEquipmentNameChange = (event) => {
    setEquipmentName(event.target.value);
  };

  const handleEquipmentSiteChange = (event) => {
    setEquipmentSite(event.target.value);
  };

  return (
    <Modal open={isOpen} onClose={closeForm}>
      <div className="new-equipment-modal-container">
        <div className="new-equipment-modal-form">
          <h2>New Equipment Form</h2>
          <div className="new-equipment-form-body">
            <FormControl fullWidth>
              <InputLabel id="equipment-site-label">Site</InputLabel>
              <Select
                labelId="equipment-site-label"
                id="equipment-site"
                value={equipmentSite}
                label="Equipment Site"
                onChange={handleEquipmentSiteChange}
              >
                {allSites.map((site) => (
                  <MenuItem key={site.siteName} value={site.siteName}>
                    {site.siteName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              id="equipment-name"
              label="Equipment Name"
              variant="outlined"
              value={equipmentName}
              onChange={handleEquipmentNameChange}
              fullWidth
            />
          </div>
          <Button
            variant="contained"
            onClick={saveData}
            className="new-equipment-form-button"
            disabled={!equipmentName || !equipmentSite || mapLayers.length !== 0}
          >
            Save Data
          </Button>
        </div>
        <div className="new-equipment-modal-map">
          <MarkerMap
            site={allSites.find((site) => site.siteName === equipmentSite)}
            equipmentName={equipmentName}
          />
        </div>
      </div>
    </Modal>
  );
};

export default NewEquipment;
