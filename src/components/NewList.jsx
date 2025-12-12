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
    const newTodo = {
      id: Date.now(),
      date: today,
      tasks: tasks,
    };

    allTodos.push(newTodo);
    localStorage.setItem("allTodos", JSON.stringify(allTodos));
    showAlert("Tasks saved successfully!");
    setTimeout(() => navigate("/alltodos"), 1000);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTasks = [...tasks];
      newTasks.splice(index + 1, 0, { text: "", completed: false });
      setTasks(newTasks);
      setTimeout(() => {
        const inputs = document.querySelectorAll(".task-input");
        if (inputs[index + 1]) inputs[index + 1].focus();
      }, 0);
    }
  };

  const handleChange = (e, index) => {
    const newTasks = [...tasks];
    newTasks[index].text = e.target.value;
    setTasks(newTasks);
  };

  const handleToggle = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const progress = tasks.length
    ? Math.round((completedCount / tasks.length) * 100)
    : 0;

  return (
    <div
      className="container-fluid py-4"
      style={{
        backgroundColor: mode === "dark" ? "#111" : "#f7f7f7",
        minHeight: "100vh",
        color: mode === "dark" ? "white" : "black",
        position: "relative",
      }}
    >
      {alertMessage && (
        <div className="alert alert-success text-center py-2" role="alert">
          {alertMessage}
        </div>
      )}

      <h2 className="mb-4" style={{ fontWeight: 700 }}>
        Task List — {today}
      </h2>

      <div className="row justify-content-center">
        <div className="col-11 col-md-8 col-lg-6">
          <div
            className="card p-4 shadow-sm mb-4"
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
                  className="me-3"
                  style={{ width: 20, height: 20 }}
                />
                <input
                  type="text"
                  value={task.text}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={mode ==="dark" ?"input-dark" : "input-light"}
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

            <button className="btn btn-success mt-3" onClick={handleSave}>
              Save
            </button>
          </div>

          <div className="mb-4">
            <label className="d-block mb-2">Progress: {progress}%</label>

            <div className="progress" style={{ height: 18 }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${progress}%` }}
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        className="btn btn-secondary"
        onClick={() => navigate("/homepage")}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 9999,
        }}
      >
        ← Back
      </button>
    </div>
  );
}

export default NewList;
