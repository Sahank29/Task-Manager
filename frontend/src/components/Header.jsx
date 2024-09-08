import React from "react";
import "../styles/Header.css";

const Header = ({ addTask, setSearchTerm }) => {
  return (
    <div className="header">
      <button
        className="add-task-btn"
        onClick={() =>
          addTask({
            id: Date.now().toString(),
            title: "New Task",
            description: "Description",
            date: new Date().toLocaleString(),
          })
        }
      >
        Add Task
      </button>
      <div className="search-sort">
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Header;
