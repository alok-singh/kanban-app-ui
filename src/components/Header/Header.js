import { useState } from "react";
import plusIcon from "../../assets/icons/plus.svg";
import { BACKEND_URLS, HTTP_METHODS } from "../../config/vars";
import Modal from "../Modal/Modal";
import NewTaskInput from "../NewTaskCard/NewTaskCard";

import { fetchResource } from "../../utils/http.util";
import Toast from "../Toast/Toast";
import "./Header.css";

const Header = (props) => {
  const [toastMessage, setToastMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClickSaveItem = async (title, description, status) => {
    await fetchResource(BACKEND_URLS.TASKS, HTTP_METHODS.POST, { title, description, status, board_id: parseInt(props.selectedBoardId) });
    setToastMessage("Successfully created new task");
    setIsModalOpen(false);
    location.reload();
  };

  const createNewTask = () => {
    setIsModalOpen(true);
  };

  return (
    <header className="header">
      <h1>Board {props.selectedId}</h1>
      <button className="add-task" onClick={createNewTask}>
        <img src={plusIcon} alt="Add" />
        Add New Task
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create a new Task"
      >
        <NewTaskInput onClickSave={(id, title, description, status) => onClickSaveItem(title, description, status)} />
      </Modal>
      <Toast message={toastMessage} />
    </header>
  );
};

export default Header;