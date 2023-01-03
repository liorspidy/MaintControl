import { Link } from 'react-router-dom';
import './Guides.css';

const items = [
  { id: 1, name: 'guide 1', description: 'This is guide 1' },
  { id: 2, name: 'guide 2', description: 'This is guide 2' },
  { id: 3, name: 'guide 3', description: 'This is guide 3' },
  { id: 4, name: 'guide 4', description: 'This is guide 4' },
  { id: 5, name: 'guide 5', description: 'This is guide 5' },
  { id: 6, name: 'guide 6', description: 'This is guide 6' },
  { id: 7, name: 'guide 7', description: 'This is guide 7' },
  { id: 8, name: 'guide 8', description: 'This is guide 8' },
  { id: 9, name: 'guide 9', description: 'This is guide 9' },
  { id: 10, name: 'guide 10', description: 'This is guide 10' },
  { id: 11, name: 'guide 11', description: 'This is guide 11' },
  { id: 12, name: 'guide 12', description: 'This is guide 12' },
];

const Guides = () => {
  const guidesList = items.map((item) => (
    <div
      className="guideContainer"
      key={item.id}
      onClick={() => <Link to={`/guides/${item.id}`} id={item.id} />}
    >
      <h1>{item.name}</h1>
      {/* <img className="guidebookIcon" src={GuideBook} alt="guidebook"/> */}
      <p>{item.description}</p>
    </div>
  ));

  return <div className="items">{guidesList}</div>;
};

export default Guides;
