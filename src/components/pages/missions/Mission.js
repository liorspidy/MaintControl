import { useState } from "react";
import { Link } from "react-router-dom";
import Fab from "@mui/material/Fab";
import NextWeekIcon from "@mui/icons-material/NextWeek";
import WorkerSelector from "./WorkerSelector";
import Checkbox from "@mui/material/Checkbox";

const Mission = (props) => {
  const [showDescription, setShowDescription] = useState(false);
  const label = { inputProps: { "aria-label": "Mission Checkbox" } };

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <li key={props.mission.id}>
      <label className="MissionLabel">
        {/* <input
          type="checkbox"
          className="MissionCheckbox"
          onChange={() => {}}
        /> */}
        {/* <span
          className="MissionCheckmark"
          style={{ backgroundColor: '#fff' }}
        ></span> */}
        <Checkbox
          {...label}
          sx={{
            color: "white",
            "&.Mui-checked": {
              color: "white",
            },
          }}
        />
        <div className="MissionContent">
          <span
            className="MissionName"
            style={{ fontSize: "1.2rem", color: "#fff" }}
          >
            {props.mission.title}
          </span>
          <div className="cityContent">
            <span className="CityTitle">City:</span>
            <span className="City" style={{ fontSize: "1rem", color: "#fff" }}>
              {props.mission.city}
            </span>
          </div>
        </div>
        <WorkerSelector />
        <Link className="taskBtn" to={`/task/mission/${props.mission.id}`}>
          <Fab size="small" color="info" aria-label="add">
            <NextWeekIcon />
          </Fab>
        </Link>
      </label>
    </li>
  );
};

export default Mission;
