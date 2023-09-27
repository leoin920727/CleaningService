import React from "react";
import { Link } from "react-router-dom";
import "./dashboard.css";
import { useOrderLength } from "./useOrderLength";

const SidebarAdmin = () => {
  const {dataLength }=useOrderLength("orderlist")

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
          <h5 className="aside-title">訂單狀態</h5>
          <Link
            to={"/dashboard"}
            className="Link-decoration"
            onClick={(e) => {
              changeStyle(e);
            }}
          >
            <span>新訂單<i className="dataNumber">{dataLength}</i></span>
          </Link>
          <Link
            to={"/dashboard/UndoneOrder"}
            className="Link-decoration"
            onClick={(e) => {
              changeStyle(e);
            }}
          >
            <span>進行中訂單</span>
          </Link>
          <Link
            to={"/dashboard/DoneOrder"}
            className="Link-decoration"
            onClick={(e) => {
              changeStyle(e);
            }}
          >
            <span>已完成訂單</span>
          </Link>
        </div>
        <div>
          <h5 className="aside-title">會員管理</h5>
          <Link
            to={"/dashboard/PersonalInfo"}
            className="Link-decoration"
            onClick={(e) => {
              changeStyle(e);
            }}
          >
            <span>會員資料</span>
          </Link>
          <Link
            to={"/dashboard/blacklist"}
            className="Link-decoration"
            onClick={(e) => {
              changeStyle(e);
            }}
          >
            <span>黑名單</span>
          </Link>
        </div>
        <div>
          <h5 className="aside-title">員工管理</h5>
          <Link
            to={"/dashboard/StaffList"}
            className="Link-decoration"
            onClick={(e) => {
              changeStyle(e);
            }}
          >
            <span>員工資料</span>
          </Link>
          <Link
            to={"/dashboard/addstaff"}
            className="Link-decoration"
            onClick={(e) => {
              changeStyle(e);
            }}
          >
            <span>員工註冊</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SidebarAdmin;
