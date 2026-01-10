import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams, useNavigate } from "react-router-dom";

function ViewTodo({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/todos/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Todo not found");
        return res.json();
      })
      .then((data) => {
        console.log("Fetched todo:", data);
        setTasks( typeof data.tasks === "string"? JSON.parse(data.tasks) :data.tasks);
        setDate(data.date);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);
  const handleSave = async () => {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tasks }),
      });

      if (!res.ok) {
        alert("Failed to update todo");
        return;
      }
      alert("Changes saved!");
      navigate("/alltodos");
    } catch (err) {console.error(err);
      alert("Server error");
    }
  };

  const handleDelete = (idx) => {
    const copy = [...tasks];
    copy.splice(idx, 1); 
    setTasks(copy);
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

  if (loading) {
    return <h4 className="text-center mt-5">Loading...</h4>;
  }

  const completed = tasks.filter((t) => t.completed).length;
  const progress = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;

  return (
    <div
      className="container-fluid py-3"
      style={{
        backgroundColor: mode === "dark" ? "#111" : "#f7f7f7",
        minHeight: "100vh",
        color: mode === "dark" ? "white" : "black",
      }}
    >
      <h4 className="mb-4 fw-bold">Task List — {date}</h4>

      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              {tasks.map((task, idx) => (
                <div key={idx} className="d-flex mb-3">
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
                    className="form-control"
                    style={{
                      textDecoration: task.completed
                        ? "line-through"
                        : "none",
                    }}
                  />
                </div>
              ))}

              <button className="btn btn-success w-100" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>

          <div className="mt-3">
            <label>Progress: {progress}%</label>
            <div className="progress">
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
        style={{ position: "fixed", bottom: 16, right: 16 }}
      >
        ← Back
      </button>
    </div>
  );
}

export default ViewTodo;
