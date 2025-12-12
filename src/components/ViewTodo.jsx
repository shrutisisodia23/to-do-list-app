import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams, useNavigate } from "react-router-dom";

function ViewTodo({ mode }) {
  const { id } = useParams();
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
  const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;
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
      <h2 className="mb-4" style={{ fontWeight: 700 }}>
        Task List — {date}
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
                  style={{ width: 20, height: 20 }}
                />
                <input
                  type="text"
                  value={task.text}
                  onChange={(e) => handleChange(e, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  placeholder="Enter task"
                  className={mode === "dark" ? "input-dark" : "input-light"}
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
        onClick={() => navigate("/alltodos")}
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

export default ViewTodo;

