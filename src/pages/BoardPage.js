import { useParams } from "react-router-dom";
import Board from "../components/Board/Board";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import boardData from "../data/boards.json";

import "./BoardPage.css";
import { useEffect, useState } from "react";
import { fetchResource } from "../utils/http.util";
import { BACKEND_URLS, HTTP_METHODS } from "../config/vars";

const BoardPage = () => {
  const { id } = useParams();
  const [boards, setBoards] = useState([]);
  const [tasks, setTasks] = useState([]);

  const fetchBoards = async () => {
    const response = await fetchResource(BACKEND_URLS.BOARDS, HTTP_METHODS.GET);
    setBoards(response);
  };

  const fetchTasks = async () => {
    const response = await fetchResource(BACKEND_URLS.TASKS, HTTP_METHODS.GET);
    setTasks(response);
  };


  useEffect(() => {
    fetchBoards();
    fetchTasks();
  }, []);

  return (
    <div className="board-page">
      <Sidebar boards={boards} selectedBoardId={id} fetchBoards={fetchBoards} />
      <div className="board-content">
        <Header selectedBoardId={id} fetchTasks={fetchTasks} />
        <Board selectedBoardId={id} tasks={tasks} fetchTasks={fetchTasks} />
      </div>
    </div>
  );
};

export default BoardPage;