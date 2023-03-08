import missionsJson from "./missions.json";
import Mission from "./Mission";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TextRotateVerticalIcon from "@mui/icons-material/TextRotateVertical";
import Button from "@mui/material/Button";
import { useState } from "react";
import "./Missions.css";

const Missions = (props) => {
  const [filter, setFilter] = useState("created_date");

  const handleFilter = (event, newFilter) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  let filteredMissions = missionsJson;

  if (filter === "abc") {
    filteredMissions = filteredMissions.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  } else if (filter === "city") {
    filteredMissions = filteredMissions.sort((a, b) =>
      a.city.localeCompare(b.city)
    );
  } else if (filter === "created_date") {
    filteredMissions = filteredMissions.sort((a, b) =>
      a.created_date.localeCompare(b.created_date)
    );
  }

  return (
    <div className="MissionsTableBox">
      <div className="MissionsBtnsBox">
        <div className="Welcome">Welcome NAME,</div>
        <div className="filtersBtns">
          <ToggleButtonGroup
            value={filter}
            exclusive
            required
            onChange={handleFilter}
            aria-label="set filter"
          >
            <ToggleButton value="created_date" aria-label="filter by city">
              <CalendarMonthIcon />
            </ToggleButton>
            <ToggleButton value="abc" aria-label="filter alphabetically">
              <TextRotateVerticalIcon />
            </ToggleButton>
            <ToggleButton value="city" aria-label="filter by city">
              <LocationCityIcon />
            </ToggleButton>
          </ToggleButtonGroup>
          <Button style={{ marginLeft: "1.2rem" }} variant="contained">
            Save
          </Button>
        </div>
      </div>
      <div className="MissionsTable">
        <ul className="Missions">
          {filteredMissions.map((mission) => (
            <Mission key={mission.id} mission={mission} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Missions;
