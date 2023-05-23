import { useParams, Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../../store/cart-context';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

// Your render function
const GuideDetails = () => {
  const { guideId } = useParams();
  const { allGuides } = useContext(CartContext);
  const [guide, setGuide] = useState({});

  useEffect(() => {
    const currGuide = allGuides?.find(
      (item) => item.guide_id === parseInt(guideId)
    );
    setGuide(currGuide);
  }, [allGuides, guideId]);

  return (
    <div>
      <h3>{guide?.title}</h3>
      <p>{guide?.description}</p>
      {guide?.file_path && (
        <div className="pdfViewer">
          <Worker workerUrl="/pdf.worker.min.js">
            <Viewer fileUrl={guide.file_path} />
          </Worker>
        </div>
      )}
      <Link to="../guides">
        <button className="backBtn">Back</button>
      </Link>
    </div>
  );
};

export default GuideDetails;
