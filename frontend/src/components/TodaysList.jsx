import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function TodaysList() {
  const [showList, setShowList] = useState(false);

  return (
    <div className="container-fluid px-3">
      <div className="text-center">
        <button className="btn btn-primary my-4 w-100 w-sm-auto" onClick={() => setShowList(true)}>
          Today's Tasks
        </button>
      </div>
      {showList && (
        <>
          <div className="modal-backdrop fade show"></div>

          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">My Tasks Today</h5>
                  <button className="btn-close" onClick={() => setShowList(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="d-flex align-items-center mb-3">
                    <input type="checkbox" className="me-3" />
                    <span>Task 1</span>
                  </div>

                  <div className="d-flex align-items-center">
                    <input type="checkbox" className="me-3" />
                    <span>Task 2</span>
                  </div>
                </div>

                <div className="modal-footer">
                  <button className="btn btn-secondary w-100" onClick={() => setShowList(false)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TodaysList;
