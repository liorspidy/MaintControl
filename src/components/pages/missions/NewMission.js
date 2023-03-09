import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchAddress from "./AddressLookup/SearchAddress";
import "./NewMission.css";

function NewMission() {
  const navigate = useNavigate();
  const today = new Date();
  const formattedDate = today.toISOString().substr(0, 10);
  const [picked, setPicked] = useState(false);
  const [addressVal, setAddressVal] = useState("");
  const [missionData, setMissionData] = useState({
    title: "",
    address: "",
    // city: "",
    description: "",
    created_date: formattedDate,
    priority: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(picked, missionData);
    if (
      picked &&
      missionData.title &&
      missionData.address &&
      missionData.created_date &&
      missionData.description &&
      missionData.priority
    )
      navigate("/missions");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMissionData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  missionData.address = addressVal;

  return (
    <div className="new-mission-form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={missionData.title}
            onChange={handleChange}
            required
          />
        </div>
        <SearchAddress setPicked={setPicked} setAddressVal={setAddressVal} />
        {/* <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={missionData.city}
            onChange={handleChange}
            required
          />
        </div> */}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={missionData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="created_date">Created Date</label>
          <input
            type="date"
            id="created_date"
            name="created_date"
            value={missionData.created_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={missionData.priority}
            onChange={handleChange}
            required
          >
            <option value="">Choose Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <button type="submit" className="create-mission-btn">
          Create Mission
        </button>
      </form>
    </div>
  );
}

export default NewMission;
