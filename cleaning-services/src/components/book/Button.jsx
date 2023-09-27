import React from "react";
import { Link } from "react-router-dom";

const Button = (props) => {
  return (
    <div className="bookbtns">
      <Link to={props.pre} id={props.class}>
        上一步
      </Link>
      <Link to={props.next} onClick={props.onClick}>
        下一步
      </Link>
    </div>
  );
};

export default Button;
