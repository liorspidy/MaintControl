import React, { useEffect, useState } from "react";
import "./NewEquipment.css";

import Modal from "@mui/material/Modal";
// import DrawableMap from "../../components/drawableMap/DrawableMap";
import Map from "../../components/map/Map";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const NewEquipment = ({ isOpen, closeForm, allSites, addEquipment }) => {
  const [mapLayers, setMapLayers] = useState([]);
  const [equipmentName, setEquipmentName] = useState("");
  const [equipmentDescription, setEquipmentDescription] = useState("");
  const [equipmentSite, setEquipmentSite] = useState("");

  useEffect(() => {
    if (isOpen) {
      setMapLayers([]);
      setEquipmentName("test equipment");
      setEquipmentDescription("zzzaaa");
    }
  }, [isOpen]);

  useEffect(() => {
    console.table(allSites);
    console.log(allSites.map((site) => site.siteName));
  }, [allSites]);

  useEffect(() => {
    console.log("equip", equipmentSite);
    console.log(allSites.filter((site) => site.name === equipmentSite));
  }, [equipmentSite]);

  const saveData = () => {
    addEquipment({ equipmentName, equipmentDescription, points: mapLayers });
    closeForm();
  };

  const equipmentNameChanged = (e) => {
    setEquipmentName(e.target.value);
  };
  const equipmentDescriptionChanged = (e) => {
    setEquipmentDescription(e.target.value);
  };

  const equipmentSiteChanged = (event) => {
    setEquipmentSite(event.target.value);
  };

  return (
    <div>
      <Modal open={isOpen} onClose={closeForm}>
        <div className="new-equipment-modal-container">
          <div className="new-equipment-modal-form">
            <h2>New Equipment Form</h2>
            <div className="new-equipment-form-body">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Site
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={equipmentSite}
                  label="Equipment Site"
                  onChange={equipmentSiteChanged}
                >
                  {allSites.map((site) => {
                    return (
                      <MenuItem key={site.siteName} value={site.siteName}>
                        {site.siteName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <TextField
                id="outlined-basic"
                label="Equipment Name"
                variant="outlined"
                value={equipmentName}
                onChange={equipmentNameChanged}
              />
            </div>
            <Button
              variant="contained"
              onClick={saveData}
              className="new-equipment-form-button"
              disabled={
                !(
                  equipmentName.length > 0 &&
                  equipmentDescription.length > 0 &&
                  mapLayers.length > 0
                )
              }
            >
              Save Data
            </Button>
          </div>
          <div className="new-equipment-modal-map">
            <Map
              sites={allSites.filter((site) => site.siteName === equipmentSite)}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NewEquipment;
