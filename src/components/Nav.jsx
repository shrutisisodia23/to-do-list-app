import React from "react"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from "react-router-dom";

function Nav(props) {
  const navigate = useNavigate();
  const goToAllTodos = () => {
    navigate("/allTodos");
  };
  const goToHome = () => {
    navigate("/")
  }
  return (
    <div className={`d-flex flex-column flex-shrink-0 p-3 bg-${props.mode === "light" ? "light" : "dark"}`} style={{ width: "200px", minHeight: "100vh" }}>
      <a href="/" className={`d-flex align-items-center mb-3 mb-md-0 me-md-auto link-${props.mode === "light" ? "dark" : "light"} text-decoration-none`}>
        <span className="fs-4">Menu</span>
      </a>
      <hr />

      <ul className="nav nav-pills flex-column mb-auto">

        <li className="nav-item">
          <a href="#" className="nav-link" aria-current="page" onClick={goToHome}>
            Home
          </a>
        </li>
        
        <li className="nav-item dropdown position-relative">
        </li>
        <li className="nav-item">
        <a href="#"
          className= "nav-link" aria-current="page"
          onClick={goToAllTodos}
        >
          View All Todos
        </a>
      </li>
      </ul>

      <hr />
        <div className={`form-check form-switch text-${props.mode === "light" ? "dark" : "light"}`}>
         <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={props.toggleMode} checked={props.mode === "dark"}/>
         <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Mode</label>
        </div>
      </div>
  );
}

export default Nav;