import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams, useNavigate } from "react-router-dom";

function ViewTodo({ mode }) {
  const {id} = useParams();
  const navigate = useNavigate();

  const storedTodos = JSON.parse(localStorage.getItem("allTodos")) || [];
  const index = storedTodos.findIndex((t) => t.id.toString() === id);

  if (index === -1) {
    return <h3 className="text-center mt-5">Todo not found</h3>;
  }

  const [tasks, setTasks] = useState(storedTodos[index].tasks);
  const date = storedTodos[index].date;

  const handleSave = () => {
    const allTodos = JSON.parse(localStorage.getItem("allTodos")) || [];
    const idx = allTodos.findIndex((t) => t.id.toString() === id);
    if (idx === -1) return;

    allTodos[idx].tasks = tasks;
    localStorage.setItem("allTodos", JSON.stringify(allTodos));
    alert("Changes saved!");
    navigate("/alltodos");
  };

  const handleChange = (e, idx) => {
    const copy = [...tasks];
    copy[idx].text = e.target.value;
    setTasks(copy);
  };

  const handleToggle = (idx) => {
    const copy = [...tasks];
    copy[idx].completed = !copy[idx].completed;
    setTasks(copy);
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const copy = [...tasks];
      copy.splice(idx + 1, 0, { text: "", completed: false });
      setTasks(copy);
    }
  };

  const completed = tasks.filter((t) => t.completed).length;
  const progress = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;

  return (
    <div
      className="container-fluid py-3 py-md-4"
      style={{
        backgroundColor: mode === "dark" ? "#111" : "#f7f7f7",
        minHeight: "100vh",
        color: mode === "dark" ? "white" : "black",
      }}
    >
      <h4 className="text-center text-md-start mb-4 fw-bold">
        Task List — {date}
      </h4>

      <div className="row justify-content-center">
        <div className="col-12 col-sm-11 col-md-8 col-lg-6">
          <div
            className="card shadow-sm mb-4"
            style={{
              backgroundColor: mode === "dark" ? "#424040ff" : "#fff",
              borderRadius: 12,
            }}
          >
            <div className="card-body p-3 p-md-4">
              {tasks.map((task, idx) => (
                <div
                  key={idx}
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
                    onChange={() => handleToggle(idx)}
                    className="me-3"
                  />

                  <input
                    type="text"
                    value={task.text}
                    onChange={(e) => handleChange(e, idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    placeholder="Enter task"
                    className="form-control"
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

              <button className="btn btn-success w-100 mt-3" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
          <div className="mb-4 px-1">
            <label className="mb-2">Progress: {progress}%</label>
            <div className="progress" style={{ height: 14 }}>
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
        onClick={() => navigate("/alltodos")}
        style={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 9999,
        }}
      >
        ← Back
      </button>
    </div>
  );
}

export default ViewTodo;
