import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './Guides.css';
import Loading from '../../../UI/Loading';

const Guides = ({ guides, setGuides }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(
          'https://maint-control-docker-image-2n3aq2y4ja-zf.a.run.app/guides/getGuides?OFFSET=0&LIMIT=100',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setGuides(data.answer);
        setIsLoading(false);
      } catch (error) {
        console.log('Error fetching guides:', error);
        setIsLoading(false);
      }
    };

    fetchGuides();
  }, []);

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

  const GuidesList = () => {
    return (
      <>
        {guides ? (
          guides.map((item) => (
            <Link
              to={
                isEditable
                  ? `/guides/editGuide/${item.guide_id}`
                  : `/guides/details/${item.guide_id}`
              }
              key={item.guide_id}
            >
              <div className="guideContainer">
                <h1>{item.title}</h1>
                <p>{item.description}</p>
              </div>
            </Link>
          ))
        ) : (
          <div>
            <h2 style={{ padding: '0.5rem' }}>No guides found...</h2>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="guideBox">
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
      <div className="items">{isLoading ? <Loading /> : <GuidesList />}</div>
    </div>
  );
};

export default Guides;
