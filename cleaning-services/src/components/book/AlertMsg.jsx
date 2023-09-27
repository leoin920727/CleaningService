import React from "react";

const AlertMsg = ({ msg, close, setShowAlert, showAlert }) => {
  return (
    <div
      className="bookAlertBg"
      onClick={(e) =>
        e.target.className === "bookAlertBg" ? setShowAlert(false) : null
      }
    >
      <div className="bookAlert">
        <p>{msg}</p>
        <button className="bookAlertBtn" onClick={close}>
          確定
        </button>
      </div>
    </div>
  );
};

export default AlertMsg;
