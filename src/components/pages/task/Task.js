import React, { useState } from "react";
import SearchBox from "./map/SearchBox";
import Maps from "./map/Maps";
import Map from "../../map/Map";
import "./Task.css";
import PrevTasksTable from "./PrevTasksTable";

const Task = (props) => {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [locationName, setLocationName] = useState("");

  return (
    <div className="taskPageBox">
      <div className="mainMapsBox">
        <div className="mainBox">
          <div className="searchBoxBox">
            <SearchBox
              selectedPosition={selectedPosition}
              setSelectedPosition={setSelectedPosition}
              setLocationName={setLocationName}
            />
          </div>
        </div>
        <div className="mapsBox">
          {/* <Maps
            selectedPosition={selectedPosition}
            locationName={locationName}
            setLocationName={setLocationName}
          /> */}
         <Map
            selectedPosition={selectedPosition}
            locationName={locationName}
            setLocationName={setLocationName}
          />
        </div>
      </div>
      <div className="prevTasksTable">
        <PrevTasksTable />
      </div>
    </div>
  );
};

export default Task;
