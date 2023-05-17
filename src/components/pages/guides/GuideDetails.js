import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

const GuideDetails = ({ guides }) => {
  const { guideId } = useParams();
  const guide = guides?.find((item) => item.guide_id === parseInt(guideId));
  console.log(guide.file_path);
  return (
    <div>
      <h3>{guide?.title}</h3>
      <p>{guide?.description}</p>
      {guide?.file_path && (
        <div className="pdfViewer">
          <Document
            file={guide.file_path}
            options={{ workerSrc: '/pdf.worker.js' }}
          >
            <Page pageNumber={1} />
          </Document>
        </div>
      )}
      <Link to="../guides">
        <button className="backBtn">Back</button>
      </Link>
    </div>
  );
};

export default GuideDetails;
