import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function AllTodos({ mode }) {
  const navigate = useNavigate();
  const [allTodos, setAllTodos] = useState([]);
  const [alertText, setAlertText] = useState("");

  const triggerAlert = (text) => {
    setAlertText(text);
    setTimeout(() => setAlertText(""), 1000);
  };

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => setAllTodos(data)).catch(() => triggerAlert("Failed to load todos"));
    }, []);

  const removeTodo = async (id) => {
    await fetch(`/api/todos/${id}`, { method: "DELETE"});
    setAllTodos((prev) => prev.filter((item) => item.id !== id));
    triggerAlert("Todo list deleted!");
  };

  return (
    <div className="container-fluid mt-3 px-2 px-sm-3">
      {alertText && (
        <div className="alert alert-success text-center py-2">
          {alertText}
        </div>
      )}

      <div className="mb-3">
        <h5
          className="fw-bold"
          style={{ color: mode === "dark" ? "#fff" : "#000" }}
        >
          All Todo Lists
        </h5>

        {allTodos.length === 0 && (
          <p
            className="small"
            style={{ color: mode === "dark" ? "#bdbdbd" : "#6c757d" }}
          >
            No To-Do List yet
          </p>
        )}
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-sm-11 col-md-8 col-lg-6">
          {allTodos.map((todo) => {
            const done = todo.tasks.filter((t) => t.completed).length;
            const progress = todo.tasks.length
              ? Math.round((done / todo.tasks.length) * 100)
              : 0;

            return (
              <div key={todo.id} className="mb-3">
                <div
                  className="card p-3 shadow-sm"
                  style={{
                    borderRadius: 14,
                    background: mode === "dark" ? "#212122" : "#fff",
                    color: mode === "dark" ? "#fff" : "#000",
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div
                      onClick={() => navigate(`/todo/${todo.id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <strong>{todo.date}</strong>
                      <div
                        className="small"
                        style={{
                          color:
                            mode === "dark" ? "#bdbdbd" : "#6c757d",
                        }}
                      >
                        {todo.tasks.length} tasks
                      </div>
                    </div>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removeTodo(todo.id)}
                    >
                      Delete
                    </button>
                  </div>

                  <div className="progress mt-2" style={{ height: 8 }}>
                    <div
                      className="progress-bar bg-success"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button
        className="btn btn-secondary"
        onClick={() => navigate("/")}
        style={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 1000,
        }}
      >
        ← Back
      </button>
    </div>
  );
}

export default AllTodos;
