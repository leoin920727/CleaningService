import React, { useState, useEffect } from "react";
import "./order.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const limitCount = 4;
  const [number, setNumber] = useState(limitCount);
  const [start, setStart] = useState(0); //從哪開始
  const navigate = useNavigate();
  const [orderAPI, setOrderAPI] = useState([]); //API變數

  // 會員資料API
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(
          "http://localhost:4107/member", {
          withCredentials: true
        });
        if (Array.isArray(result.data)) {
          setOrderAPI(() => {
            return result.data.filter((data) => data.state !== 2)
            // return result.data.sort(function (a, b) {
            //   return a.state >= b.state ? 1 : -1;
            // });
          });
          
        } else {
          console.error("Received non-array data from the API.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  // 判斷訂單狀態
  const handleOrderStatus = (state) => {
    if (state === 0) {
      return "新訂單";
    } else if (state === 1) {
      return "進行中";
    }
    return "已完成";
  };

  // 換頁
  const prevPageClick = () => {
    setNumber(number - limitCount > 0 ? number - limitCount : limitCount);
    setStart(start - limitCount > 0 ? start - limitCount : 0);
  };
  const nextPageClick = (data) => {
    setNumber(start + limitCount < data.length ? number + limitCount : number);
    setStart(start + limitCount < data.length ? start + limitCount : start);
  };

  return (
    <>
    <h3 className="m-0 h3_DEF">處理中訂單</h3>
    <div className="dashOrder">
    <h3 className="m-0 h3_RWD">處理中訂單</h3>
      <div className="orderInfo">
        <span className="orderCard">
          <img src="/images/order.png" alt=""  className="animated-image"/>
          <p className="orderText ">預約快速</p>
        </span>
        <p className="line"></p>
        <span className="orderCard">
          <img src="/images/orderGoing.png" alt="" className="animated-car"/>
          <p className="orderText ">使命必達</p>
        </span>
        <p className="line"></p>
        <span className="orderCard">
          <img src="/images/orderCleaning.png" alt=""className="animated-clear" />
          <p className="orderText ">專業清掃</p>
        </span>
        <p className="line"></p>
        <span className="orderCard">
          <img src="/images/orderCleaned.png" alt="" className="animated-price" />
          <p className="orderText ">價格實惠</p>
        </span>
        <p className="line"></p>
        <span className="orderCard">
          <img src="/images/orderDone.png" alt="" className="animated-check"/>
          <p className="orderText ">嚴格把關</p>
        </span>
      </div>
      <table className="tbody_def">
        <thead className="orderThead">
          <tr>
            <th>訂單編號</th>
            <th>員工編號</th>
            <th>訂單日期</th>
            <th>清潔週數</th>
            <th>剩餘次數</th>
            <th>訂單金額</th>
            <th>訂單狀態</th>
          </tr>
        </thead>
        <tbody className="orderTbody">
          {orderAPI
            .slice(start, number)
            .map(
              ({
                ornumber,
                employeeid,
                ordertime,
                weeks,
                donetime,
                money,
                state,
              }) => {
                return (
                  <tr
                    key={ornumber}
                    onClick={() => {
                      navigate(`/member/${ornumber}`);
                    }}
                  >
                    <td>{ornumber}</td>
                    <td>{employeeid}</td>
                    <td>{new Date(ordertime).toLocaleDateString('en-CA')}</td>
                    <td>{weeks}週</td>
                    <td>{weeks-donetime}次</td>
                    <td>{money}</td>
                    <td>{handleOrderStatus(state)}</td>
                  </tr>
                );
              })}
        </tbody>
      </table>
      <table className="tbody_RWD">
        <tbody className="orderTbody">
          {orderAPI
            .slice(start, number)
            .map(
              ({
                ornumber,
                employeeid,
                ordertime,
                weeks,
                donetime,
                money,
                state,
              }) => {
                return (
                  <tr key={ornumber} onClick={() => { navigate(`/member/${ornumber}`) }}>
                    <tr>
                      <td>訂單編號:{ornumber}</td>
                      <td>訂單日期:{new Date(ordertime).toLocaleDateString('en-CA')}</td>
                      <td>訂單狀態:{handleOrderStatus(state)}</td>
                    </tr>
                </tr>
                );
              })}
        </tbody>
      </table>
      <div className="orderBtn-group">
        <button onClick={() => prevPageClick()} className="orderBtn">
          上一頁
        </button>
        <button onClick={() => nextPageClick(orderAPI)} className="orderBtn">
          下一頁
        </button>
      </div>
    </div>
    </>);
};

export default Order;
