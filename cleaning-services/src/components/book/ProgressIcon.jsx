import React from "react";

const ProgressBar = (props) => {
  return (
    <div className="progressIcon">
      <i className={props.class}></i>
      <p>{props.text}</p>
    </div>
  );
};

export default ProgressBar;
