import React, { useState, useEffect } from "react";
import "./order.css";
import OrderStaff from "./orderStaff";
import Score from "./score";
import axios from "../login/axios";
import { useParams } from "react-router-dom";
import ControllAccordion from "./ControllAccordion";
import MemberDone from "./MemberDone";
import { useAttendance } from "./useAttendance";

const OrderDone = () => {
  const [modal, setModal] = useState(false);
  const [orderAPI, setOrderAPI] = useState("");
  const [staffAPI, setStaffAPI] = useState("");
  const [evaluateAPI, setEvaluateAPI] = useState({});
  const [isClose, setIsclose] = useState("");
  const [updataScore, setUpdataScore] = useState(false);
  const [orderScore, setOrderScore] = useState({});
  const { orderNumber } = useParams();
  const { attdata, dayTime } = useAttendance({ ornumber: orderNumber });
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(`/member/${orderNumber}`);
        setOrderAPI(() => result.data.results1[0]); //訂單資料
        setStaffAPI(() => result.data.results2[0]); //員工資料
        setEvaluateAPI(() => result.data.results3[0]); //評價
        setOrderScore(() => {
          if (result.data.results4[0]) {
            const { efficiency, clean, careful, manner } =
              result.data.results4[0];
            return (efficiency + clean + careful + manner) / 4;
          } else {
            return 0;
          }
        });
        setIsclose(() => result.data.results4[0]?.reply); //評價
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [orderNumber]);

  const {
    note,
    time,
    donetime,
    weeks,
    ornumber,
    orcity,
    orrural,
    oraddress,
    money,
    state,
    orderdone,
    ordertime,
    pay,
  } = orderAPI;

  function handleTime(time) {
    if (time === 0) return "08:00";
    if (time === 1) return "13:00";
    if (time === 2) return "18:00";
  }
  const getOrderDay = () => {
    if (dayTime) {
      const day = new Date(dayTime[0].date).getDay();
      console.log(day);
      switch (day) {
        case 1:
          return "一";
        case 2:
          return "二";
        case 3:
          return "三";
        case 4:
          return "四";
        case 5:
          return "五";
        case 6:
          return "六";
        case 0:
          return "日";
        default:
          return "未知";
      }
    }
  };

  return (
    <>
      <h3 className="m-0 h3_DEF">會員訂單</h3>
      <div className="dashOrder">
        <h3 className="m-0 h3_RWD">會員訂單</h3>
        {updataScore && (
          <div className="updataScore">
            <div className="updataScoreTOP">
              感謝您的評價!! <br />
              <img src="/images/sraccoon-salute.gif" alt="" />
            </div>
          </div>
        )}
        {modal && (
          <Score
            setUpdataScore={setUpdataScore}
            setModal={setModal}
            orderAPI={orderAPI}
            evaluateAPI={evaluateAPI}
            staffAPI={staffAPI}
          />
        )}
        <div className="orderInfo">
          <span className="orderCard">
            <img src="/images/order.png" alt="" className="animated-image" />
            <p className="orderText ">預約快速</p>
          </span>
          <p className="line"></p>
          <span className="orderCard">
            <img src="/images/orderGoing.png" alt="" className="animated-car" />
            <p className="orderText ">使命必達</p>
          </span>
          <p className="line"></p>
          <span className="orderCard">
            <img
              src="/images/orderCleaning.png"
              alt=""
              className="animated-clear"
            />
            <p className="orderText ">專業清掃</p>
          </span>
          <p className="line"></p>
          <span className="orderCard">
            <img
              src="/images/orderCleaned.png"
              alt=""
              className="animated-price"
            />
            <p className="orderText ">價格實惠</p>
          </span>
          <p className="line"></p>
          <span className="orderCard">
            <img
              src="/images/orderDone.png"
              alt=""
              className="animated-check"
            />
            <p className="orderText ">嚴格把關</p>
          </span>
        </div>
        <div className="contact-table">
          <table border={1} className="w-100">
            <thead className="orderThead tbody_def">
              <tr>
                <th>訂單編號</th>
                <th>成立時間</th>
                <th>時段</th>
                <th>清潔地點</th>
              </tr>
            </thead>
            <tbody className="doneTbody orderDn tbody_def">
              <tr>
                <td>{ornumber}</td>
                <td>{new Date(ordertime).toLocaleDateString("en-CA")}</td>
                <td>
                  {`星期${getOrderDay()}-`}
                  {handleTime(time)}
                </td>
                <td>{orcity + orrural + oraddress}</td>
              </tr>
            </tbody>
            <thead className="orderThead tbody_def">
              <tr>
                <th>訂單金額</th>
                <th>付款方式</th>
                <th>訂單狀態</th>
                <th>備註</th>
              </tr>
            </thead>
            <tbody className="doneTbody orderDn tbody_def">
              <tr>
                <td>{money}元</td>
                <td>{pay ? "信用卡" : "其他"}</td>
                <td>
                  {state === 2 && isClose ? (
                    <span className="text-success fw-bold">已完成</span>
                  ) : isClose === undefined && state === 2 ? (
                    <button
                      onClick={() => {
                        setModal(true);
                      }}
                      className="orderBtn p-0 ps-2 pe-2"
                    >
                      給評價
                    </button>
                  ) : (
                    <span className="text-danger fw-bold">進行中</span>
                  )}
                </td>
                <td>{note || "無備註"}</td>
              </tr>
            </tbody>
            <thead className="orderThead orderDn tbody_RWD">
              <tr>
                <td>訂單編號:</td>
                <td>{ornumber}</td>
              </tr>
              <tr>
                <td>成立時間:</td>
                <td>{new Date(ordertime).toLocaleDateString("en-CA")}</td>
              </tr>
              <tr>
                <td>時段:</td>
                <td>{handleTime(time)}</td>
              </tr>
              <tr>
                <td>清潔地點:</td>
                <td>{orcity + orrural + oraddress}</td>
              </tr>
              <tr>
                <td>付款方式:</td>
                <td>{pay ? "信用卡" : "其他"}</td>
              </tr>
              <tr>
                <td>訂單金額:</td>
                <td>{money}元</td>
              </tr>
              <tr>
                <td>備註:</td>
                <td>{note || "無備註"}</td>
              </tr>
              <tr>
                <td>完成狀態:</td>
                <td>
                  {state === 2 && isClose ? (
                    <span className="text-success fw-bold">已完成</span>
                  ) : !isClose && state === 2 ? (
                    <button
                      onClick={() => {
                        setModal(true);
                      }}
                      className="orderBtn p-0 ps-2 pe-2"
                    >
                      給評價
                    </button>
                  ) : (
                    <span className="text-danger fw-bold">進行中</span>
                  )}
                </td>
              </tr>
            </thead>
          </table>
        </div>
        <div className="contact-table row">
          <div
            className="col-12"
            style={{
              fontSize: "30px",
            }}
          >
            <span style={{ color: "red" }}>{donetime}/</span>
            <span>{weeks}</span>
            <span>清潔紀錄</span>
          </div>
          {attdata?.length !== 0 && (
            <div
              className="ControllAccordion col-12"
              style={{ overflow: "auto" }}
            >
              <ControllAccordion items={attdata} Accordion={MemberDone} />
            </div>
          )}
        </div>
        {isClose && state === 2 && (
          <div className="contact-table">
            <div>
              <h5 style={{ display: "flex" }}>
                顧客評分:
                <div style={{ position: "relative", zIndex: 1 }}>
                  <img
                    src="/images/staffInfo-star.png"
                    alt="star-y"
                    style={{
                      clipPath: `inset(0 ${100 - orderScore * 20}% 0 0)`,
                    }}
                  />
                  <img
                    src="/images/staffInfo-star2.png"
                    alt="star-g"
                    style={{ position: "absolute" }}
                  />
                </div>
              </h5>

              <h5 style={{ color: "#664d03" }}>
                訂單評論:
                {<span>{isClose}</span> || "訂單尚未完成"}
              </h5>
            </div>
          </div>
        )}
        <OrderStaff staffAPI={staffAPI} evaluateAPI={evaluateAPI} />
      </div>
    </>
  );
};

export default OrderDone;
