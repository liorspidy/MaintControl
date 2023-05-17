import React from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Slider from 'react-slick';

const FillTaskSubtask = ({
  paragraphIndex,
  paragraph,
  subtask,
  subtaskIndex,
  setSubtasks,
}) => {
  //add note handler
  function handleAddNote(subtaskIndex) {
    setSubtasks((prevSubtasks) => {
      const newSubtasks = [...prevSubtasks];
      newSubtasks[subtaskIndex].paragraphs.push('');
      return newSubtasks;
    });
  }

  //add photo handler
  function handleAddPhoto(subtaskIndex, paragraphIndex, event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setSubtasks((prevSubtasks) => {
        const newSubtasks = [...prevSubtasks];
        const paragraph = newSubtasks[subtaskIndex].paragraphs[paragraphIndex];
        newSubtasks[subtaskIndex].paragraphs[
          paragraphIndex
        ] = `${paragraph}\nPhoto: ${reader.result}`;
        return newSubtasks;
      });
    };
    reader.readAsDataURL(file);
  }

  //remove photo handler
  const handleRemoveImage = (subtaskIndex, paragraphIndex, index) => {
    console.log(subtaskIndex, paragraphIndex, index);
  };

  const subtaskPhotoHandler = () => {};

  return (
    <>
      <li key={paragraphIndex} className="fillTaskParBox">
        <div className="fillTaskPar">
          <div className="parNumber">{paragraphIndex + 1}.</div>
          <div className="fillTaskParDesc">
            <p>{paragraph.text}</p>
          </div>
        </div>
        <div className="fillTaskPhotosBox">
          <div className="fillTaskAddPhotos">
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={(event) =>
                handleAddPhoto(subtaskIndex, paragraphIndex, event)
              }
            />
            <div>
              <Fab
                size="small"
                color="white"
                aria-label="add a note"
                className="addNoteButton"
                onClick={() => handleAddNote(subtaskIndex)}
              >
                <AddIcon type="button" />
              </Fab>
            </div>
          </div>
          <Slider infinite={true} swipe={true} dots={true}>
            {subtask?.paragraphs[paragraphIndex]?.links_to_photos?.map(
              (url, index) => {
                return (
                  <div className="fillTaskPhotosSlider" key={index}>
                    <div className="removeImageButton">
                      <Fab
                        size="small"
                        color="white"
                        aria-label="remove image"
                        className="addParagraphButton"
                        onClick={() =>
                          handleRemoveImage(
                            subtaskIndex,
                            paragraphIndex,
                            index,
                            url
                          )
                        }
                      >
                        <DeleteIcon type="button" />
                      </Fab>
                    </div>
                    <img
                      title={`Slide ${index + 1}`}
                      onClick={subtaskPhotoHandler}
                      className="fillTaskPhotos"
                      src={url}
                      alt={`Slide ${index}`}
                    />
                  </div>
                );
              }
            )}
          </Slider>
        </div>
      </li>
    </>
  );
};

export default FillTaskSubtask;
