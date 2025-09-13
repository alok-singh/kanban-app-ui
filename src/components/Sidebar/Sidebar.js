import { Link } from "react-router-dom";
import "./Sidebar.css";
import { useState } from "react";
import { fetchResource } from "../../utils/http.util";
import { BACKEND_URLS, HTTP_METHODS } from "../../config/vars";
import NewBoardInput from "../NewBoardInput/NewBoardInput";
import Modal from "../Modal/Modal";
import Toast from "../Toast/Toast";

const Sidebar = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const onClickSave = async (updateTitle) => {
    await fetchResource(BACKEND_URLS.BOARDS, HTTP_METHODS.POST, { title: updateTitle });
    setToastMessage("Successfully created new board");
    setIsModalOpen(false);
    props.fetchBoards();
  };

  const deleteBoard = async (id) => {
    await fetchResource(`${BACKEND_URLS.BOARDS}/${id}`, HTTP_METHODS.DELETE);
    setToastMessage("Successfully deleted board");
    setIsModalOpen(false);
    props.fetchBoards();
  };

  return (
    <aside className="sidebar">
      <h2 className="logo">Kanban</h2>
      {props?.boards?.length ? <nav>
        <ul>
          {props.boards.map(item => {
            return <Link to={`/board/${item.id}`}>
              {item.id == props.selectedBoardId ? <li className="active">{item.title}</li> : <li>{item.title}</li>}
              <div className="delete-button" title="Delete board" onClick={() => deleteBoard(item.id)}>&times;</div>
            </Link>
          })}
          <li className="new-board" onClick={() => setIsModalOpen(true)}>+ Create New Board</li>
        </ul>
      </nav> : <div>Loading...</div>}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create new Board"
      >
        <NewBoardInput id={props.selectedBoardId} onClickSave={(title) => onClickSave(title)} />
      </Modal>
      <Toast message={toastMessage} />
    </aside>
  );
};

export default Sidebar;