import React, { useState, useEffect } from "react";
import "../styles/Modal.css";

const Modal = ({ task, isEditing, onSave, onClose }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
  }, [task]);

  const handleSave = () => {
    onSave({ ...task, title, description });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {isEditing ? (
          <>
            <h2>Edit Task</h2>
            <label>Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={handleSave}>Save</button>
              <button onClick={onClose}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <h2>Task Details</h2>
            <p>
              <strong>Title:</strong> {task.title}
            </p>
            <p>
              <strong>Description:</strong> {task.description}
            </p>
            <p>
              <strong>Created at:</strong> {task.date}
            </p>
            <div className="task-actions">
              <button onClick={onClose} className="view-details-btn">
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
