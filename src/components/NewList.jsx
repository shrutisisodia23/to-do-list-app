import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function NewList({ mode }) {
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString();
  const [tasks, setTasks] = useState([{ text: "", completed: false }]);
  const [alertMessage, setAlertMsg] = useState("");

  const showAlert = (msg) => {
    setAlertMsg(msg);
    setTimeout(() => setAlertMsg(""), 1000);
  };

  const handleSave = () => {
    const allTodos = JSON.parse(localStorage.getItem("allTodos")) || [];
    allTodos.push({
      id: Date.now(),
      date: today,
      tasks,
    });
    localStorage.setItem("allTodos", JSON.stringify(allTodos));
    showAlert("Tasks saved successfully!");
    setTimeout(() => navigate("/alltodos"), 1000);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const copy = [...tasks];
      copy.splice(index + 1, 0, { text: "", completed: false });
      setTasks(copy);
      setTimeout(() => {
        const inputs = document.querySelectorAll(".task-input");
        if (inputs[index + 1]) inputs[index + 1].focus();
      }, 0);
    }
  };

  const handleChange = (e, index) => {
    const copy = [...tasks];
    copy[index].text = e.target.value;
    setTasks(copy);
  };

  const handleToggle = (index) => {
    const copy = [...tasks];
    copy[index].completed = !copy[index].completed;
    setTasks(copy);
  };

  const completed = tasks.filter((t) => t.completed).length;
  const progress = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;

  return (
    <div
      className="container-fluid py-3 px-2 px-sm-3"
      style={{
        backgroundColor: mode === "dark" ? "#111" : "#f7f7f7",
        minHeight: "100vh",
        color: mode === "dark" ? "white" : "black",
      }}
    >
      {alertMessage && (
        <div className="alert alert-success text-center py-2">
          {alertMessage}
        </div>
      )}

      <div className="text-center mb-3">
        <h4 className="fw-bold">Task List — {today}</h4>
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-sm-11 col-md-8 col-lg-6">
          <div
            className="card p-3 p-sm-4 shadow-sm mb-4"
            style={{
              backgroundColor: mode === "dark" ? "#424040ff" : "#fff",
              borderRadius: 12,
            }}
          >
            {tasks.map((task, index) => (
              <div
                key={index}
                className="d-flex align-items-center mb-3"
                style={{
                  backgroundColor: mode === "dark" ? "#1f1f1f" : "#fff",
                  padding: "8px 12px",
                  borderRadius: 8,
                }}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggle(index)}
                  className="me-2 me-sm-3"
                  style={{ width: 18, height: 18 }}
                />
                <input
                  type="text"
                  value={task.text}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`flex-grow-1 task-input ${
                    mode === "dark" ? "input-dark" : "input-light"
                  }`}
                  placeholder="Enter task"
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    outline: "none",
                    textDecoration: task.completed ? "line-through" : "none",
                    color: mode === "dark" ? "white" : "black",
                  }}
                />
              </div>
            ))}

            <button className="btn btn-success w-100 mt-2" onClick={handleSave}>
              Save
            </button>
          </div>

          <div className="mb-4">
            <label className="d-block mb-2">Progress: {progress}%</label>
            <div className="progress" style={{ height: 16 }}>
              <div
                className="progress-bar"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <button
        className="btn btn-secondary"
        onClick={() => navigate("/")}
        style={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 9999
        }}
      >
        ← Back
      </button>
    </div>
  );
}

export default NewList;
