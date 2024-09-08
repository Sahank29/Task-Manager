import React from "react";
import TaskList from "./TaskList";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const TaskBoard = ({ tasks, onDragEnd, viewTask, editTask, deleteTask }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="task-board">
        {Object.keys(tasks).map((listId) => (
          <Droppable key={listId} droppableId={listId}>
            {(provided) => (
              <div className="task-list" {...provided.droppableProps} ref={provided.innerRef}>
                <h3>{listId}</h3>
                <TaskList
                  tasks={tasks[listId]}
                  viewTask={viewTask}
                  editTask={editTask}
                  deleteTask={deleteTask}
                  listId={listId}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
