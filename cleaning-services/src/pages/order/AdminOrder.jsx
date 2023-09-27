import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "../../components/member/member.css";
import MemberDone from "../../components/dashboard/MemberDone";
import { useAttendance } from "../../components/dashboard/useAttendance";
import ControllAccordion from "../../components/dashboard/ControllAccordion";

const Member = () => {
  const { ornumber } = useParams();
  const [orderData, setOrderData] = useState({});
  const { attdata } = useAttendance({ ornumber:ornumber})
  const {
    userid,
    orname,
    oremail,
    orphone,
    orcity,
    orrural,
    oraddress,
    money,
    pay,
    ordertime,
    orderdone,
    state,
    note,
    employeeid,
    date,
    time,
    weeks,
    donetime,
    employeename,
    employeephone,
    employeeemail,
  } = orderData;

  

  //接收資料
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(
          `http://localhost:4107/AdminOrder/${ornumber}`
        );
        setOrderData(result.data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [ornumber,state]);

  const handleOrderStatus = (state) => {
    if (state === 0) {
      return "新訂單";
    } else if (state === 1) {
      return "進行中";
    }
    return "已完成";
  };

  const handleTime = (time) => {
    if (time === 0) {
      return "08:00";
    } else if (time === 1) {
      return "13:00";
    }
    return "18:00";
  };

  return (
    <div>
      <div className="Container">
        <h3 className="orderh3">管理訂單</h3>
        <div
          className={`orderContainer bgdone ${state === 2 ? "complete" : ""}`}
        >
          <div className="orderContent row">
            <div className="col" style={{
              fontSize: "30px"}}>
              <span style={{ color: "red"}}>{donetime}/</span>
              <span>{weeks}</span>
              <p>{handleOrderStatus(state)}</p>
            </div>
            <table border={1} className="col">
              <tr>
                <th style={{ fontWeight: "600" }}>
                  <Link
                    to={`/dashboard/PersonalInfo/${userid}`}
                    className="Link-decoration"
                  >
                    訂購人資料
                  </Link>
                </th>
              </tr>
              <tr>
                <td>會員編號:{userid}</td>
              </tr>
              <tr>
                <td>訂購人姓名:{orname}</td>
              </tr>
              <tr>
                <td>聯絡方式:{orphone}</td>
              </tr>
              <tr>
                <td>Email:{oremail}</td>
              </tr>
            </table>
            <table border={1} className="col">
              <tr>
                <th style={{ fontWeight: "600" }}>
                  <Link
                    to={`/dashboard/StaffList/${employeeid}`}
                    className="Link-decoration"
                  >
                    清潔員
                  </Link>
                </th>
              </tr>
              <tr>
                <td>員工編號:{employeeid}</td>
              </tr>
              <tr>
                <td>姓名:{employeename}</td>
              </tr>
              <tr>
                <td>聯絡方式:{employeephone}</td>
              </tr>
              <tr>
                <td>Email:{employeeemail}</td>
              </tr>
            </table>
          </div>
          {/* 訂單資訊 */}
          <table border={1}>
            <tr>
              <th style={{ fontWeight: "600" }}>訂單資料</th>
              <th></th>
            </tr>
            <tr>
              <td>訂單編號:{ornumber}</td>
              <td>服務日期:{new Date(date).toLocaleDateString("en-CA")}</td>
            </tr>
            <tr>
              <td>服務時段:{handleTime(time)}</td>
              <td>服務週數:{weeks}</td>
            </tr>
            <tr>
              <td>付款方式:{pay ? "信用卡" : "無"}</td>
              <td>訂單金額:{money}元</td>
            </tr>
            <tr>
              <td>服務次數:{donetime}</td>
              <td>清潔地址:{orcity + orrural + oraddress}</td>
            </tr>
            <tr>
              <td>訂單日期:{new Date(ordertime).toLocaleString("en-CA")}</td>
              <td>
                完成時間:
                {orderdone ? new Date(orderdone).toLocaleString("en-CA") : ""}
              </td>
            </tr>
          </table>
          <div className="orderContent">備註:{note || "無"}</div>
          {attdata?.length !== 0 && <div className="ControllAccordion col-12" style={{ overflow: "auto" }}>
                <ControllAccordion items={attdata} Accordion={MemberDone}  />
            </div> }
        </div>
      </div>
    </div>
  );
};

export default Member;
