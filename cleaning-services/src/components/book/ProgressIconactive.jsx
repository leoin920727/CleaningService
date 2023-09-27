import React from "react";

const ProgressIconactive = (props) => {
  return (
    <div className="progressIcon-active">
      <i className={props.class}></i>
      <p>{props.text}</p>
    </div>
  );
};

export default ProgressIconactive;
