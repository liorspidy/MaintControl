import { Link } from 'react-router-dom';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import items from './guides.json';
import './Guides.css';

const Guides = () => {
  const [isEditable, setIsEditable] = useState(false);

  const handleIsEditable = () => {
    setIsEditable(!isEditable);
  };

  const guidesList = isEditable
    ? items.map((item) => (
        <Link to={`/guides/editGuide/${item.id}`} key={item.id}>
          <div className="guideContainer">
            <h1>{item.name}</h1>
            <p>{item.description}</p>
          </div>
        </Link>
      ))
    : items.map((item) => (
        <div className="guideContainer">
          <h1>{item.name}</h1>
          <p>{item.description}</p>
        </div>
      ));

  return (
    <div>
      <div className="guideButtons">
        <div className="guideBtn">
          <Link to="addGuide">
            <AddIcon className="addIcon" />
          </Link>
        </div>
        <div className="guideBtn" onClick={handleIsEditable}>
          {isEditable && <EditIcon className="editIconEditOn" />}
          {!isEditable && <EditIcon className="editIconEditOff" />}
        </div>
        <div className="guideBtn">
          <DeleteIcon className="deleteIcon" />
        </div>
      </div>
      <div className="items">{guidesList}</div>
    </div>
  );
};

export default Guides;
