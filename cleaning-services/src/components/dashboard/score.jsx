import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./order.css";
import Fraction from "./Fraction";
import axios from "axios";
let data = [
  { id: 1, name: "打掃分數：", value: 5 },
  { id: 2, name: "效率分數：", value: 5 },
  { id: 3, name: "態度分數：", value: 5 },
  { id: 4, name: "細心分數：", value: 5 },
];

const Score = ({
  setModal,
  orderAPI,
  staffAPI,
  evaluateAPI,
  setUpdataScore,
}) => {
  const [counters, setCounters] = useState(data);
  const [comment, setComment] = useState("無評論內容");
  const { orderNumber } = useParams();

  useEffect(() => {
    !comment && setComment("沒有評論");
  }, [comment, counters]);

  async function handleScoreUpdata() {
    try {
      await axios.put(`http://localhost:4107/member/updata/${orderNumber}`, {
        data: counters,
        comment: comment,
        orderAPI: orderAPI,
      });
      setModal(false);
      setUpdataScore(true);
      setTimeout(() => {
        setUpdataScore(false);
        window.scrollTo(0, 0);
        window.location.reload();
      }, 2500);
    } catch (error) {
      console.error("Error updata data:", error);
    }
  }

  const staffStar = evaluateAPI
    ? Object.values(evaluateAPI).reduce((aa, bb) => {
        aa += bb / 4;
        return aa;
      }, 0)
    : 0;

  return (
    <dialog open className="scoreOP">
      <div className="scoreTop">填寫評價</div>
      <div className="scoreBody">
        <img className="orderStaff" src={staffAPI.photo} alt="" />
      </div>
      <div className="scoreBody scoretext">
        <span>
          {staffAPI.employeeid}-{staffAPI.employeename}
        </span>
      </div>
      <div className="scoreStart">
        <div className="scoreStart" style={{ position: "relative" }}>
          <img
            src="/images/staffInfo-star.png"
            alt="star-y"
            style={{ clipPath: `inset(0 ${100 - staffStar * 20}% 0 0)` }}
          />
          <img src="/images/staffInfo-star2.png" alt="star-g" />
        </div>
      </div>
      <div className="scoreBody scoretext">
        {counters.map((counter, index) => (
          <Fraction
            key={counter.id}
            name={counter.name}
            value={counter.value}
            order={index}
            counters={counters}
            setCounters={setCounters}
          />
        ))}
      </div>
      <input
        className="scoreBody scoreinput"
        type="text"
        placeholder="請寫下評論內容"
        onInput={(e) => {
          setComment(e.target.value);
        }}
      />
      <div className="scoreBody">
        <div className="orderBtns">
          <button className="orderBtn" onClick={() => setModal(false)}>
            略過
          </button>
          <button
            onClick={() => {
              handleScoreUpdata();
            }}
            className="orderBtn"
          >
            送出評論
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Score;
