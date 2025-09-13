import { useState } from "react";
import { ERROR_MESSAGES } from "../../config/vars";

import './NewBoardInput.css';

const NewBoardInput = (props) => {
  const [title, setTitle] = useState(props.title || "");

  return (
    <div className="task-input">
      <div className="task-group">
        <label>Title</label>
        <input type="text" placeholder="Enter task title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <div className="error-message">
          {title.length > 3 ? "" : ERROR_MESSAGES.wrongInputLength}
        </div>
      </div>
      <div className="task-actions">
        <button className="save-btn" onClick={() => props.onClickSave(title)}>
          Save Board
        </button>
      </div>
    </div>
  );
};

export default NewBoardInput;