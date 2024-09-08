import { BrowserRouter, Routes, Route } from "react-router-dom";

import TaskManager from "./pages/TaskManager";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/" element={<TaskManager />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
