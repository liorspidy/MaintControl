import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import items from '../guides.json';
import './EditGuide.css';

const EditGuide = () => {
  const { guideId } = useParams();
  const guide = items.find((item) => item.id === parseInt(guideId));
  const [guideName, setGuideName] = useState(guide ? guide.name : '');
  const [guideDetails, setGuideDetails] = useState(
    guide ? guide.description : ''
  );
  const [guideFile, setGuideFile] = useState(guide ? guide.file : '');
  const [error, setError] = useState('');

  const handleGuideNameChange = (event) => {
    setGuideName(event.target.value);
  };

  const handleGuideDetailsChange = (event) => {
    setGuideDetails(event.target.value);
  };

  const handleGuideFileChange = (event) => {
    setGuideFile(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (guideName.length === 0 && guideDetails.length === 0) {
      setError("Must enter Guide's name and details");
    } else if (guideName.length < 4) {
      setError("Guide's name must be at least 4 characters");
    } else if (guideDetails.length < 4) {
      setError("Guide's details must be at least 4 characters");
    } else {
      // submit the form
      setError('');
    }
  };

  return (
    <div className="addGuideBox">
      <form onSubmit={handleSubmit} className="addGuideForm">
        <label className="addGuideLabel" htmlFor="guideName">
          Guide's name:
          <input
            id="guideName"
            className="addGuideInput"
            type="text"
            value={guideName}
            onChange={handleGuideNameChange}
          />
        </label>
        <label className="addGuideLabel" htmlFor="guideDetails">
          Guide's details:
          <textarea
            id="guideDetails"
            className="addGuideInput"
            value={guideDetails}
            onChange={handleGuideDetailsChange}
          />
        </label>
        <label className="addGuideLabel" htmlFor="guideFile">
          Guide's file:
          <input
            id="guideFile"
            className="guideFileInput"
            type="file"
            value={guideFile}
            onChange={handleGuideFileChange}
          />
        </label>
        <Link to="../guides">
          <button className="addGuideBtn" type="submit">
            Save
          </button>
        </Link>
      </form>
      {error && <p className="addGuideError">{error}</p>}
    </div>
  );
};

export default EditGuide;
