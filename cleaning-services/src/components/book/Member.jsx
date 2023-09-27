import React from "react";

const Member = (props) => {
  return (
    <div className="memberItem" onClick={props.onClick} id={props.id}>
      <div className="memberImg">
        <img className="img-fluid " src={props.img} alt="staffimg" />
      </div>
      <div className="memberName">
        <h5>{props.name}</h5>
      </div>
      <div className="memberScore">
        <img src="./images/score-icon.png" alt="icon" className="me-1" />
        <h5>
          <i>{props.score}</i>
        </h5>
      </div>
    </div>
  );
};

export default Member;
