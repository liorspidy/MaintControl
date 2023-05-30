import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const GuideDetails = () => {
  const { guideId } = useParams();
  const [guide, setGuide] = useState({});

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage

        const response = await fetch(
          'https://maint-control-docker-image-2n3aq2y4ja-zf.a.run.app/guides/getSingleGuide',
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ guide_id: guideId }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setGuide(data.answer);
        } else {
          console.error('Failed to fetch guide');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchGuide();
  }, []);

  return (
    <div>
      <h3>{guide[0]?.title}</h3>
      <p>{guide[0]?.description}</p>
      {guide[0]?.file_path && (
        <div className="pdfViewer">
          <Worker workerUrl="/pdf.worker.min.js">
            <Viewer fileUrl={guide[0].file_path} />
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
