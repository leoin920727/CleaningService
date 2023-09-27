import React from "react";

const DashBoardAlert = ({ message, onClose, Cancel, checkout }) => {
  return (
    <div className="DashBoardAlert-shell">
      <div className="DashBoardAlert">
        {message === "success" ? (
          <p className="text-success fs-6 m-0">
            <i className="bi bi-check-circle">{checkout}</i>
          </p>
        ) : (
          <p className="text-danger fs-6 m-0">
            <i className="bi bi-x-circle">{Cancel}</i>
          </p>
        )}
        <button className="orderBtn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default DashBoardAlert;
