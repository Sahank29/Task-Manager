import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskBoard from "../components/TaskBoard";
import Modal from "../components/Modal";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import "../styles/TaskManger.css";

const TaskManager = () => {
  const [tasks, setTasks] = useState({
    TODO: [],
    "IN PROGRESS": [],
    DONE: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));

    if (!token) {
      navigate("/login");
    } else {
      fetchTasks();
    }
  }, [navigate]);

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/task/");
      const data = await response.json();

      if (response.ok) {
        setTasks(data);
      } else {
        console.error("Error fetching tasks:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addTask = async (newTask) => {
    try {
      const response = await fetch("/api/task/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      const data = await response.json();

      if (response.ok && data.status === 200) {
        setTasks((prevTasks) => ({
          ...prevTasks,
          TODO: [...prevTasks.TODO, newTask],
        }));
      } else {
        console.error("Error adding task:", data.message);
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (listId, taskId) => {
    try {
      const response = await fetch(`/api/task/${taskId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok && data.status === 202) {
        const updatedList = tasks[listId].filter((task) => task.id !== taskId);
        setTasks((prevTasks) => ({
          ...prevTasks,
          [listId]: updatedList,
        }));
      } else {
        console.error("Error deleting task:", data.message);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const viewTask = (task) => {
    setSelectedTask(task);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const editTask = (task) => {
    setSelectedTask(task);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const updateTask = async (updatedTask) => {
    try {
      const response = await fetch(`/api/task/${updatedTask.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      const data = await response.json();

      if (response.ok && data.status === 204) {
        if (selectedTask && selectedTask.listId) {
          const updatedList = tasks[selectedTask.listId].map((task) =>
            task.id === updatedTask.id ? data.task : task
          );
          setTasks((prevTasks) => ({
            ...prevTasks,
            [selectedTask.listId]: updatedList,
          }));
          setIsModalOpen(false);
        } else {
          return true;
        }
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
    return true;
  };

  const onDragEnd = async (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const list = Array.from(tasks[source.droppableId]);
      const [movedTask] = list.splice(source.index, 1);
      list.splice(destination.index, 0, movedTask);

      setTasks((prevTasks) => ({
        ...prevTasks,
        [source.droppableId]: list,
      }));
    } else {
      const sourceList = Array.from(tasks[source.droppableId]);
      const destinationList = Array.from(tasks[destination.droppableId]);

      const [movedTask] = sourceList.splice(source.index, 1);
      destinationList.splice(destination.index, 0, movedTask);

      setTasks((prevTasks) => ({
        ...prevTasks,
        [source.droppableId]: sourceList,
        [destination.droppableId]: destinationList,
      }));

      movedTask.status = destination.droppableId;

      const success = await updateTask(movedTask);

      if (!success) {
        sourceList.splice(source.index, 0, movedTask);
        destinationList.splice(destination.index, 1);

        setTasks((prevTasks) => ({
          ...prevTasks,
          [source.droppableId]: sourceList,
          [destination.droppableId]: destinationList,
        }));
      }
    }
  };

  const filterTasks = () => {
    const filteredTasks = { TODO: [], "IN PROGRESS": [], DONE: [] };

    Object.keys(tasks).forEach((list) => {
      filteredTasks[list] = tasks[list].filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    return filteredTasks;
  };

  const filteredTasks = filterTasks();

  return (
    <div className="task-manager">
      <Navbar />
      <Header addTask={addTask} setSearchTerm={setSearchTerm} />
      <TaskBoard
        tasks={filteredTasks}
        onDragEnd={onDragEnd}
        viewTask={viewTask}
        editTask={editTask}
        deleteTask={deleteTask}
      />

      {isModalOpen && (
        <Modal
          task={selectedTask}
          isEditing={isEditing}
          onSave={updateTask}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default TaskManager;
