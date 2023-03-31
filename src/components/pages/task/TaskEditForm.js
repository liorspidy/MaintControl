import React, { useState } from 'react';
import './TaskEditForm.css';
import tasksList from './tasks.json';
import { useParams } from 'react-router-dom';

function TaskEditForm(props) {
  const [subtasks, setSubtasks] = useState([]);

  const { taskId } = useParams();
  const tasks = tasksList.find((task) => task.task_id === parseInt(taskId));

  const defaultTaskDetails = {
    product_serial_number: tasks.product_serial_number,
    product_type: tasks.product_type,
    problem: tasks.problem,
    status: tasks.status,
    location: tasks.location,
    date_created: tasks.date_created,
    date_updated: tasks.date_updated,
  };

  function handleAddSubtask() {
    setSubtasks([...subtasks, { paragraphs: [] }]);
  }

  function handleAddParagraph(subtaskIndex) {
    setSubtasks((prevSubtasks) => {
      const newSubtasks = [...prevSubtasks];
      newSubtasks[subtaskIndex].paragraphs.push('');
      return newSubtasks;
    });
  }

  function handleParagraphChange(subtaskIndex, paragraphIndex, event) {
    setSubtasks((prevSubtasks) => {
      const newSubtasks = [...prevSubtasks];
      newSubtasks[subtaskIndex].paragraphs[paragraphIndex] = event.target.value;
      return newSubtasks;
    });
  }

  function handleAddPhoto(subtaskIndex, paragraphIndex, event) {
    setSubtasks((prevSubtasks) => {
      const newSubtasks = [...prevSubtasks];
      const paragraph = newSubtasks[subtaskIndex].paragraphs[paragraphIndex];
      newSubtasks[subtaskIndex].paragraphs[
        paragraphIndex
      ] = `${paragraph}\nPhoto: ${event.target.value}`;
      return newSubtasks;
    });
  }

  return (
    <div className="tasksListBox">
      <form className="task-fill-form-container">
        <div className="form-group">
          <label htmlFor="product_type">Product Type</label>
          <input
            id="product_type"
            type="text"
            defaultValue={defaultTaskDetails.product_type}
          />
        </div>
        <div className="form-group">
          <label htmlFor="product_serial_number">Product Serial Number</label>
          <input
            id="product_serial_number"
            type="text"
            defaultValue={defaultTaskDetails.product_serial_number}
          />
        </div>
        <div className="form-group">
          <label htmlFor="problem">Problem</label>
          <textarea id="problem" defaultValue={defaultTaskDetails.problem} />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            defaultValue={defaultTaskDetails.status}
            required
          >
            <option value="">Choose Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="date_created">Date Created</label>
          <input
            type="date"
            id="date_created"
            name="date_created"
            defaultValue={defaultTaskDetails.date_created}
            required
          />
        </div>
        <button>Save Task</button>
      </form>

      <form className="task-fill-form-container">
        <h2>Subtasks</h2>
        <button type="button" onClick={handleAddSubtask}>
          Add Subtask
        </button>
        {subtasks.map((subtask, subtaskIndex) => (
          <div key={subtaskIndex}>
            <h3>Subtask {subtaskIndex + 1}</h3>
            <button
              type="button"
              onClick={() => handleAddParagraph(subtaskIndex)}
            >
              Add Paragraph
            </button>
            <ul>
              {subtask.paragraphs.map((paragraph, paragraphIndex) => (
                <li key={paragraphIndex}>
                  <div>
                    <label
                      htmlFor={`subtask-${subtaskIndex}-paragraph-${paragraphIndex}-text`}
                    >
                      Text
                    </label>
                    <textarea
                      id={`subtask-${subtaskIndex}-paragraph-${paragraphIndex}-text`}
                      value={paragraph}
                      onChange={(event) =>
                        handleParagraphChange(
                          subtaskIndex,
                          paragraphIndex,
                          event
                        )
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`subtask-${subtaskIndex}-paragraph-${paragraphIndex}-photo`}
                    >
                      Photo URL
                    </label>
                    <input
                      id={`subtask-${subtaskIndex}-paragraph-${paragraphIndex}-photo`}
                      type="text"
                      onChange={(event) =>
                        handleAddPhoto(subtaskIndex, paragraphIndex, event)
                      }
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </form>
    </div>
  );
}

export default TaskEditForm;
