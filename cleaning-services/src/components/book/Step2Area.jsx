import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BookContext from "./book-context";
import MyCalendar from "./MyCalendar";
import Button from "./Button";
import AlertMsg from "./AlertMsg";

const Step2Area = () => {
  const navigate = useNavigate();
  const ctx = useContext(BookContext);
  const [weekMode, setWeekMode] = useState([]);
  const [timeMode, setTimeMode] = useState([1, 1, 1]);
  const [dayMode, setDayMode] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertErr, setShowAlertErr] = useState(false);
  const checkDataNum = document.getElementsByClassName("selected");
  const weeks = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  const time = ["08:00", "13:00", "18:00"];

  const changeClickStyle2 = (e, pElm, tElm, t) => {
    const otherItems = document.querySelectorAll(pElm);
    const clearTime = document.querySelectorAll(t);
    otherItems.forEach((item) => {
      item.classList.remove("selected");
    });
    clearTime.forEach((item) => {
      item.classList.remove("selected");
    });
    let targetElement = e.target;
    while (!targetElement.classList.contains(tElm)) {
      targetElement = targetElement.parentElement;
    }
    targetElement.classList.toggle("selected");
    ctx.week = e.target.id;
    if (ctx.week) {
      axios
        .get(
          `http://localhost:4107/book/free-time?employeeid=${ctx.employeeid}&weekDay=${ctx.week}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          setTimeMode(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const changeClickStyle3 = (e, pElm, tElm) => {
    const otherItems = document.querySelectorAll(pElm);
    otherItems.forEach((item) => {
      item.classList.remove("selected");
    });
    let targetElement = e.target;
    while (!targetElement.classList.contains(tElm)) {
      targetElement = targetElement.parentElement;
    }
    targetElement.classList.toggle("selected");

    ctx.time = e.target.id;
    if (ctx.week) {
      axios
        .get(
          `http://localhost:4107/book/free-time?employeeid=${ctx.employeeid}&weekDay=${ctx.week}&timespan=${ctx.time}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          setDayMode(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    axios
      .get(
        `http://localhost:4107/book/free-time?employeeid=${ctx.employeeid}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setWeekMode(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const checkForm = (e) => {
    e.preventDefault();
    let { user } = ctx;
    if (user === null) {
      return setShowAlertErr(true);
    }
    if (checkDataNum.length === 3) navigate("/book/book3");
    else {
      setShowAlert(true);
    }
  };

  return (
    <form className="container d-flex  justify-content-center align-items-center flex-column">
      <div className="d-flex container justify-content-center align-items-center book-step1">
        <div className="left show-form">
          <div className="step2Top">
            <h5 className="heading" data-number="01">
              <span>選擇服務時間</span>
            </h5>
            <div className="chooseTime">
              {weekMode.map((week, index) => (
                <div
                  key={index}
                  id={index}
                  className={week ? "service-week" : "not-choose"}
                  onClick={
                    week
                      ? (e) =>
                          changeClickStyle2(
                            e,
                            ".service-week",
                            "service-week",
                            ".service-time"
                          )
                      : null
                  }
                >
                  {weeks[index]}
                </div>
              ))}
            </div>
          </div>
          <div className="step2Bottom">
            <h5 className="heading " data-number="02">
              <span>選擇服務時段</span>
            </h5>
            <div className="chooseTime">
              {timeMode.map((t, index) => (
                <div
                  key={index}
                  id={index}
                  className={t ? "service-time" : "not-choose"}
                  onClick={
                    t
                      ? (e) =>
                          changeClickStyle3(e, ".service-time", "service-time")
                      : null
                  }
                >
                  {time[index]}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="right show-form">
          <MyCalendar freeDays={dayMode} />
        </div>
        {showAlert && (
          <AlertMsg
            msg={"請完成表單填寫!"}
            close={() => setShowAlert(false)}
            showAlert={showAlert}
            setShowAlert={setShowAlert}
          />
        )}
        {showAlertErr && (
          <AlertMsg
            msg={"發生了點小問題，請重新填寫表單！"}
            close={() => {
              setShowAlertErr(false);
              navigate("/book");
            }}
          />
        )}
      </div>
      <Button pre="/book" next="/book/book3" onClick={checkForm} />
    </form>
  );
};

export default Step2Area;
