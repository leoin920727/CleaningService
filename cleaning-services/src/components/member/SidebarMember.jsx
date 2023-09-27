import React from "react";
import { Link } from "react-router-dom";
import "../../components/dashboard/dashboard.css";
const SidebarMember = () => {
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
        <h3>會員專區</h3>
        <div>
          <h5 className="aside-title">會員資料</h5>
          <Link
            onClick={(e) => {
              changeStyle(e);
            }}
            to={"/member/memberinfo"}
            className="Link-decoration"
          >
            <span>基本資料</span>
          </Link>
          <Link
            onClick={(e) => {
              changeStyle(e);
            }}
            to={"/member/changepwd"}
            className="Link-decoration"
          >
            <span>更改密碼</span>
          </Link>
        </div>
        <div>
          <h5 className="aside-title">我的訂單</h5>
          <Link
            onClick={(e) => {
              changeStyle(e);
            }}
            to={"/member"}
            className="Link-decoration"
          >
            <span>處理中</span>
          </Link>
          <Link
            onClick={(e) => {
              changeStyle(e);
            }}
            to={"/member/orderdone"}
            className="Link-decoration"
          >
            <span>已完成訂單</span>
          </Link>
        </div>
      </div>
      <br /><br /><br /><br /><br />
      <br />
        <img src="/images/sraccoon.gif" alt="" />
    </div>
  );
};

export default SidebarMember;
