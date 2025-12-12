import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage(props) {
  const navigate = useNavigate();

  const handleNew = () => {
    navigate("/newlist");
  };



  return (
    <div className="container mt-3">

      {/* Buttons on Top Right */}


      <div className="d-flex justify-content-center">
        <div
          className="card text-center shadow"
          style={{
            backgroundColor: props.mode === "dark" ? "#222" : "#fff",
            color: props.mode === "dark" ? "white" : "black",
            borderRadius: "14px",
            width: "100%"
          }}
        >
          <div className="my-3">{props.hello}</div>

          <div className="card-body">
            <h5 className="card-title">{props.appName}</h5>
            <p>{props.introduction}</p>

            <button className="btn btn-primary" onClick={handleNew}>
              New +
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default HomePage;
