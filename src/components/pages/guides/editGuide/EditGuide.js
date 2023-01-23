import './EditGuide.css';
import { useState } from 'react';

const EditGuide = () =>
{
    const [guideName, setGuideName] = useState('');
    const [guideDetails, setGuideDetails] = useState('');
    const [guideFile, setGuideFile] = useState('');
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
      <br />
      <label className="addGuideLabel" htmlFor="guideDetails">
        Guide's details:
          <input
            id="guideDetails"
            className="addGuideInput"
            value={guideDetails}
            onChange={handleGuideDetailsChange}
          />
      </label>
      <br />
      <label className="addGuideLabel" htmlFor="guideFile">
        Insert file here: 
        
          <input type="file" 
             id="guideFile"
             className="guideFileInput"
             value={guideFile}
            onChange={handleGuideFileChange} 
          />
      </label>
      
      {error && <div className="addGuideError">{error}</div>}
      <br />
      <button className="addGuideButton" type="submit">
        Save
      </button>
    </form>
  </div>
);
};

export default EditGuide;