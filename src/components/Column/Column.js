import React from "react";
import TaskCard from "../TaskCard/TaskCard";
import "./Column.css";

const Column = (props) => {
  return (
    <div className="column">
      <h3>{props.title}</h3>
      {props.tasks.map(task => (
        <TaskCard key={task.id} title={task.title} description={task.description} onClick={() => props.onClickCard(task.id)} />
      ))}
    </div>
  );
};

export default Column;