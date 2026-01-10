import React from "react"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from "react-router-dom";

function Nav(props) {
  const navigate = useNavigate();

  const goToAllTodos = () => navigate("/alltodos");
  const goToHome = () => navigate("/");

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg d-lg-none ${
          props.mode === "light" ? "navbar-light bg-light" : "navbar-dark bg-dark"
        }`}
      >
        <div className="container-fluid">
          <span className="navbar-brand fw-bold">Menu</span>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mobileMenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobileMenu">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <button className="nav-link btn" onClick={goToHome}>
                  Home
                </button>
              </li>

              <li className="nav-item">
                <button className="nav-link btn" onClick={goToAllTodos}>
                  View All Todos
                </button>
              </li>
            </ul>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                onChange={props.toggleMode}
                checked={props.mode === "dark"}
              />
              <label className="form-check-label">Mode</label>
            </div>
          </div>
        </div>
      </nav>
      <div
        className={`d-none d-lg-flex flex-column flex-shrink-0 p-3 bg-${
          props.mode === "light" ? "light" : "dark"
        }`}
        style={{ width: "200px", minHeight: "100vh" }}
      >
        <span
          className={`fs-4 mb-3 text-${
            props.mode === "light" ? "dark" : "light"
          }`}
        >
          Menu
        </span>

        <hr />

        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item mb-2">
            <button className="nav-link btn text-start" onClick={goToHome}>
              Home
            </button>
          </li>

          <li className="nav-item mb-2">
            <button className="nav-link btn text-start" onClick={goToAllTodos}>
              View All Todos
            </button>
          </li>
        </ul>

        <hr />

        <div
          className={`form-check form-switch text-${
            props.mode === "light" ? "dark" : "light"
          }`}
        >
          <input
            className="form-check-input"
            type="checkbox"
            onChange={props.toggleMode}
            checked={props.mode === "dark"}
          />
          <label className="form-check-label">Mode</label>
        </div>
      </div>
    </>
  );
}

export default Nav;
