import React from "react";
import { Link } from "react-router-dom";
import "./dashboard.css";

const SidebarAdmin = () => {

  const changeStyle = (e) => {
    const otherItems = document.querySelectorAll("span");
    otherItems.forEach((item) => {
      item.classList.remove("sideBarBtnToggle");
    });
    e.target.classList.toggle("sideBarBtnToggle");
  };

  return (
    <div className="aside">
      <div className="aside-main">
        <div>
        <h3>浣熊專區</h3>
        <div>
          <h5 className="aside-title">浣熊資料</h5>
          <Link
            onClick={(e) => {
              changeStyle(e);
            }}
            to={"/employee/memberinfo"}
            className="Link-decoration"
          >
            <span>基本資料</span>
          </Link>
          <Link
            onClick={(e) => {
              changeStyle(e);
            }}
            to={"/employee/EmployeePwd"}
            className="Link-decoration"
          >
            <span>更改密碼</span>
          </Link>
        </div>
          <h5 className="aside-title">訂單狀態</h5>
          <Link
            to={"/employee/"}
            className="Link-decoration"
            onClick={(e) => {
              changeStyle(e);
            }}
          >
            <span>進行中訂單</span>
          </Link>
          <Link
            to={"/employee/employeeDone"}
            className="Link-decoration"
            onClick={(e) => {
              changeStyle(e);
            }}
          >
            <span>歷史訂單</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SidebarAdmin;
