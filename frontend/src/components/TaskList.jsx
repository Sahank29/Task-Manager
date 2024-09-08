import React from "react";
import { Draggable } from "react-beautiful-dnd";

const TaskList = ({ tasks, viewTask, editTask, deleteTask, listId }) => {
  return (
    <div>
      {tasks.map((task, index) => (
        <Draggable key={task.id} draggableId={task.id} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="task-card"
            >
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <p>Created at: {task.date}</p>
              <div className="task-actions">
                <button
                  onClick={() => viewTask({ ...task, listId })}
                  className="view-details-btn"
                >
                  View
                </button>
                <button
                  onClick={() => editTask({ ...task, listId })}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(listId, task.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
};

export default TaskList;
