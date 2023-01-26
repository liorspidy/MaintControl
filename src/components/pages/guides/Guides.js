import { Link } from 'react-router-dom';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import items from './guides.json';
import './Guides.css';

const Guides = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleIsEditable = () => {
    if (!isRemoving) {
      setIsEditable(!isEditable);
    }
  };

  const handleIsRemoving = () => {
    if (!isEditable) {
      setIsRemoving(!isRemoving);
    }
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
    : !isRemoving
    ? items.map((item) => (
        <Link to={`/guides/details/${item.id}`} key={item.id}>
          <div className="guideContainer">
            <h1>{item.name}</h1>
            <p>{item.description}</p>
          </div>
        </Link>
      ))
    : items.map((item) => (
        <div className="guideContainer" key={item.id}>
          <h1>{item.name}</h1>
          <p>{item.description}</p>
        </div>
      ));

  return (
    <div>
      <div className="guideButtons">
        <Link to="addGuide">
          <div className="guideBtn">
            <AddIcon className="addIcon" />
          </div>
        </Link>
        <div className="guideBtn" onClick={handleIsEditable}>
          {isEditable && <EditIcon className="editIconEditOn" />}
          {!isEditable && <EditIcon className="editIconEditOff" />}
        </div>
        <div className="guideBtn" onClick={handleIsRemoving}>
          {isRemoving && <DeleteIcon className="deleteIconRemovingOn" />}
          {!isRemoving && <DeleteIcon className="deleteIconRemovingOff" />}
        </div>
      </div>
      <div className="items">{guidesList}</div>
    </div>
  );
};

export default Guides;
