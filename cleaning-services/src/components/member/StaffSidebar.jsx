import React from "react";
import { Link } from "react-router-dom";
import "../dashboard/dashboard.css";
import { useOrderLength } from "../dashboard/useOrderLength";

const StaffSidebar = () => {
    const { dataLength } = useOrderLength("orderlist")

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
                        to={"/staff"}
                        className="Link-decoration"
                        onClick={(e) => {
                            changeStyle(e);
                        }}
                    >
                        <span>進行中訂單</span>
                    </Link>
                    <Link
                        to={"/staff/history"}
                        className="Link-decoration"
                        onClick={(e) => {
                            changeStyle(e);
                        }}
                    >
                        <span>已完成訂單</span>
                    </Link>
                </div>
                
                
            </div>
        </div>
    );
};

export default StaffSidebar;
