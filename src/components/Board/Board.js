import { useState } from "react";
import Column from "../Column/Column";
import { BACKEND_URLS, HTTP_METHODS, STATUSES } from "../../config/vars";
import { fetchResource } from "../../utils/http.util";
import Modal from "../Modal/Modal";
import NewTaskInput from "../NewTaskCard/NewTaskCard";
import Toast from "../Toast/Toast";
import "./Board.css";

const parseResponse = (data, selectedId) => {
  return data.filter(item => item.board_id == selectedId)
    .reduce((acc, item) => {
      acc[item.status] = acc[item.status] ? acc[item.status] : [];
      acc[item.status].push(item);
      return acc;
    }, Object.keys(STATUSES).reduce((acc, item) => {
      acc[item] = [];
      return acc;
    }, {}))
};

const Board = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateId, setUpdateId] = useState('');
  const [updateTitle, setUpdateTitle] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const [updateStatus, setUpdateStatus] = useState(STATUSES.TODO);

  const taskData = parseResponse(props.tasks, props.selectedBoardId);
  const boardParsedDataKeys = Object.keys(taskData);

  const onClickEditItem = (id) => {
    const selectedItem = boardParsedDataKeys.flatMap(key => taskData[key]).find(item => item.id === id);
    setUpdateId(id);
    setUpdateTitle(selectedItem.title);
    setUpdateDescription(selectedItem.description);
    setUpdateStatus(selectedItem.status);
    setIsModalOpen(true);
    props.fetchTasks();
  };

  const onClickUpdateItem = async (id, title, description, status) => {
    const requestData = { title, description, status, board_id: parseInt(props.selectedBoardId) };
    await fetchResource(`${BACKEND_URLS.TASKS}/${id}`, HTTP_METHODS.PUT, requestData);
    setIsModalOpen(false);
    setToastMessage("Successfully updated");
    props.fetchTasks();
  };

  const onClickDeleteItem = async (id) => {
    await fetchResource(`${BACKEND_URLS.TASKS}/${id}`, HTTP_METHODS.DELETE);
    setIsModalOpen(false);
    setToastMessage("Successfully deleted");
    props.fetchTasks();
  };

  return (
    <div className="board">
      {
        boardParsedDataKeys.length ? boardParsedDataKeys.map(key => {
          return <Column title={key} tasks={taskData[key]} onClickCard={onClickEditItem} />
        }) : <div>Loading...</div>
      }
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Update the Task"
      >
        <NewTaskInput id={updateId} title={updateTitle} description={updateDescription} status={updateStatus}
          onClickSave={(id, title, description, status) => onClickUpdateItem(id, title, description, status)}
          onClickDelete={(id) => onClickDeleteItem(id)}
        />
      </Modal>
      <Toast message={toastMessage} />
    </div>
  );
};

export default Board;