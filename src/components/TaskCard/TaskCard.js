import "./TaskCard.css";

const TaskCard = (props) => {
  return (
    <div className="task-card" onClick={props.onClick}>
      <div className="title">{props.title}</div>
      <div className="description">{props.description}</div>
    </div>
  );
};

export default TaskCard;