import missionsJson from './missions.json';
import Mission from './Mission';
import './Missions.css';

const Missions = (props) => {
  return (
    <div className="MissionsTableBox">
      <div className="Welcome">Welcome NAME,</div>
      <div className="MissionsTable">
        <ul className="Missions">
          {missionsJson.map((mission) => (
            <Mission key={mission.id} mission={mission} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Missions;
