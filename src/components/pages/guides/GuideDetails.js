import { useParams } from "react-router-dom";
import items from "./guides.json";
import { Link } from "react-router-dom";

const GuideDetails = (props) => {
  const { guideId } = useParams();
  const guide = items.find((item) => item.id === parseInt(guideId));

  return (
    <div>
      <h3>{guide.name}</h3>
      <p>{guide.description}</p>
      <Link to="../guides">
        <button className="addGuideBtn">Back</button>
      </Link>
    </div>
  );
};

export default GuideDetails;
