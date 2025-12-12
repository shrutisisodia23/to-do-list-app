import { useState } from "react";

function TodaysList() {
  const [showList, setShowList] = useState(false);

  const openList = () => setShowList(true);
  const closeList = () => setShowList(false);

  return (
    <>
    <div className="container">
      <button className="btn btn-primary my-5" onClick={openList}>
        Today's Tasks
      </button>

      {showList && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">My Tasks Today</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeList}
                ></button>
              </div>

              <div className="modal-body">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <input
                        type="checkbox"
                        aria-label="Checkbox for following text input"
                      />
                    </div>
                  </div>{" "}
                  Task 1
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <input
                        type="checkbox"
                        aria-label="Checkbox for following text input"
                      />
                    </div>
                  </div>
                  Task2
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeList}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

      )}
    </div>
    </>
  );
}

export default TodaysList;
