import { useState } from "react";
import { ERROR_MESSAGES, STATUSES } from "../../config/vars";
import './NewTaskCard.css';

const NewTaskInput = (props) => {
  const [title, setTitle] = useState(props.title || '');
  const [description, setDescription] = useState(props.description || '');
  const [status, setStatus] = useState(props.status || STATUSES.TODO);

  return (
    <div className="task-input">
      <div className="task-group">
        <label>Title</label>
        <input type="text" placeholder="Enter task title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <div className="error-message">
          {title.length > 3 ? "" : ERROR_MESSAGES.wrongInputLength}
        </div>
      </div>
      <div className="task-group">
        <label>Description</label>
        <textarea rows="3" placeholder="Enter task description" value={description} onChange={({ target }) => setDescription(target.value)} />
        <div className="error-message">
          {title.length > 3 ? "" : ERROR_MESSAGES.wrongInputLength}
        </div>
      </div>
      <div className="task-group">
        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          {Object.values(STATUSES).map(item => <option value={item}>{item}</option>)}
        </select>
      </div>
      <div className="task-actions">
        <button className="save-btn" onClick={() => props.onClickSave(props.id, title, description, status)}>
          Save Task
        </button>
        {props.onClickDelete ? <button className="cancel-btn" onClick={() => props.onClickDelete(props.id)}>
          Delete Task
        </button> : null}
      </div>
    </div>
  );
};

export default NewTaskInput;