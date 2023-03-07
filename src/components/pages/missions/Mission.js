import { useState } from 'react';
import { Link } from 'react-router-dom';
import NextWeekIcon from '@mui/icons-material/NextWeek';

const Mission = (props) => {
  const [showDescription, setShowDescription] = useState(false);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <li key={props.mission.id}>
      <label className="MissionLabel">
        <input
          type="checkbox"
          className="MissionCheckbox"
          onChange={() => {}}
        />
        <span
          className="MissionCheckmark"
          style={{ backgroundColor: '#fff' }}
        ></span>
        <div>
          <span
            className="MissionName"
            style={{ fontSize: '1.2rem', color: '#fff' }}
          >
            {props.mission.title}
          </span>
        </div>
        <Link className="taskBtn" to={`/task/mission/${props.mission.id}`}>
          <button className="MissionExpandButton" onClick={toggleDescription}>
            <NextWeekIcon />
          </button>
        </Link>
      </label>
    </li>
  );
};

export default Mission;
