import React from "react";

const TaskCard = ({ task }) => {
  return (
    <div className="task-card">
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <p>Created at: {task.date}</p>
      <div className="task-actions">
        <button className="delete-btn">Delete</button>
        <button className="edit-btn">Edit</button>
        <button className="view-details-btn">View Details</button>
      </div>
    </div>
  );
};

export default TaskCard;
