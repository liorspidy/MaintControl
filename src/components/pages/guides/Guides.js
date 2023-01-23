import { Link } from 'react-router-dom';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './Guides.css';

const items = [
  { id: 1, name: 'guide 1', description: 'This is guide 1',file:''},
  { id: 2, name: 'guide 2', description: 'This is guide 2',file:''},
  { id: 3, name: 'guide 3', description: 'This is guide 3',file:''},
  { id: 4, name: 'guide 4', description: 'This is guide 4',file:'' },
  { id: 5, name: 'guide 5', description: 'This is guide 5',file:''},
  { id: 6, name: 'guide 6', description: 'This is guide 6',file:''},
  { id: 7, name: 'guide 7', description: 'This is guide 7',file:'' },
  { id: 8, name: 'guide 8', description: 'This is guide 8',file:''},
  { id: 9, name: 'guide 9', description: 'This is guide 9',file:''},
  { id: 10, name: 'guide 10', description: 'This is guide 10',file:''},
  { id: 11, name: 'guide 11', description: 'This is guide 11',file:'' },
  { id: 12, name: 'guide 12', description: 'This is guide 12',file:'' },
];

const Guides = () => {

  const [isEditable, setIsEditable] = useState(false);

  const handleIsEditable = () => {
    setIsEditable(!isEditable); // toggle isEditable state
  };

  const guidesList = items.map((item) => (
    <div
      className="guideContainer"
      key={item.id}
      onClick={() => 
            {if
              (isEditable===true) 
              <Link to={`/guides/editGuide/${item.id}`} id={item.id} />
              else
                 isEditable=false;///////open the file
            }
     //onClick={() =><Link to={"/guides/editGuide/:guideId"} id={item.id} />}
       } >
      <h1>{item.name}</h1>
      <p>{item.description}</p>
    </div>
  ));

  return (
    <div>
      <div className="guideButtons">
        <div className="guideBtn">
          <Link to="addGuide">
          <AddIcon className="addIcon"/>
          </Link>
        </div>
        <div className="guideBtn">
          {isEditable && (
              <EditIcon className="editIconEditOn"  onClick={handleIsEditable} />
            )}
            {!isEditable && (
              <EditIcon className="editIconEditOff"  onClick={handleIsEditable} />
            )}
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
