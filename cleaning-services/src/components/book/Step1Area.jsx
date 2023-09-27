import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import axios from "axios";
import BookContext from "./book-context";
import "bootstrap/dist/css/bootstrap.min.css";
import Member from "./Member";
import Button from "./Button";
import AlertMsg from "./AlertMsg";
import { scroll } from "./utils";

const Step1Area = () => {
  scroll();
  const navigate = useNavigate();
  const ctx = useContext(BookContext);
  const [membersData, setMemberData] = useState([]);
  const [weekCount, setWeekCount] = useState(4);
  const [weekPrice, setWeekPrice] = useState(8000);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertErr, setShowAlertErr] = useState(false);
  const checkDataNum = document.getElementsByClassName("selected");
  const areaInfo = [
    {
      area: "客廳",
      detail: "桌櫃擦拭、地板清潔、地毯除塵、沙發與隙縫處清潔",
    },
    {
      area: "臥室",
      detail: "衣櫃外觀擦拭、地板清潔、桌面清潔、家電外觀擦拭",
    },
    {
      area: "廚房",
      detail: "流理檯、瓦斯爐台、地板、抽油煙機清潔、冰箱外觀、桌櫃擦拭",
    },
    {
      area: "浴室",
      detail:
        "馬桶刷洗、浴缸清潔、鏡面光亮、洗手檯面清潔、磁磚刷洗、浴門地板清潔",
    },
    {
      area: "窗戶",
      detail: "內側底溝擦拭、紗窗內部清潔、玻璃窗內部清洗",
    },
    {
      area: "陽台",
      detail: "地板刷洗、水管擦拭、曬衣桿擦拭",
    },
  ];

  const changeClickStyle1 = (e, pElm, tElm) => {
    const otherItems = document.querySelectorAll(pElm);
    otherItems.forEach((item) => {
      item.classList.remove("selected");
    });
    let targetElement = e.target;
    while (!targetElement.classList.contains(tElm)) {
      targetElement = targetElement.parentElement;
    }
    targetElement.classList.toggle("selected");
    ctx.employeeid = targetElement.id;
  };
  useEffect(() => {
    axios
      .get(`http://localhost:4107/book/price?week=${weekCount}`, {
        withCredentials: true,
      })
      .then((res) => {
        setWeekPrice(res.data[0].price);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [weekCount]);

  useEffect(() => {
    axios
      .get("http://localhost:4107/book/employee-info", {
        withCredentials: true,
      })
      .then((response) => {
        setMemberData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const getPrice = () => {
    let option = document.querySelector("select").value;
    setWeekCount(Number(option));
    ctx.weeks = Number(option);
  };
  let checkForm = (e) => {
    e.preventDefault();
    let { user } = ctx;
    if (user === null) {
      return setShowAlertErr(true);
    }
    if (checkDataNum.length === 1) navigate("/book/book2");
    else {
      setShowAlert(true);
    }
  };

  return (
    <form className="container d-flex align-items-center flex-column">
      <div className="d-flex container justify-content-center align-items-center book-step1 ">
        <div className="left show-form">
          <h5 className="mb-2">定期清掃目前僅提供一週一次的清潔頻率</h5>
          <div className="serviceItem">
            <div id="itemTitle">
              <h4>每週打掃一次</h4>
            </div>
            <div id="itemInfo">
              <h5>每次打掃4小時</h5>
              <p>每次派遣一位專員前往打掃</p>
            </div>
          </div>
          <div id="chooseWeeks" className="mt-4">
            <label htmlFor="serviceWeeks">
              <h4 className="emphasis">選擇服務週數</h4>
            </label>
            <select name="service_weeks" id="serviceWeeks" onChange={getPrice}>
              {Array.from({ length: 21 }, (v, i) => i).map((item) => {
                return (
                  <option value={item + 4} key={item}>
                    {item + 4}週
                  </option>
                );
              })}
            </select>
            <output>{weekPrice} 元</output>
          </div>
          <p className="mt-2 memo">
            &#9959;一次訂購8週(含)以上打9折、16週(含)以上打8折&#9959;
          </p>
          <div id="cleanArea">
            <h5>定期提供以下區域的清潔服務</h5>
            <div id="cleanInfo">
              {areaInfo.map((item, index) => {
                return (
                  <p key={`area-${index}`}>
                    {item.area}
                    <OverlayTrigger
                      key={`overlay-${index}`}
                      placement="top"
                      overlay={
                        <Tooltip
                          id={`tooltip-${index}`}
                          className="custom-tooltip"
                        >
                          {item.detail}
                        </Tooltip>
                      }
                    >
                      <i className="bi bi-info-circle"></i>
                    </OverlayTrigger>
                  </p>
                );
              })}
            </div>
          </div>
        </div>
        <div className="right show-form">
          <div id="chooseMember">
            <div
              className="not-specify"
              id="null"
              onClick={(e) => {
                changeClickStyle1(e, ".memberItem", "not-specify");
              }}
            >
              <h5>不指定人員</h5>
            </div>
            <div>
              <div className="specify">
                {membersData.map((p, index) => {
                  return (
                    <Member
                      onClick={(e) => {
                        changeClickStyle1(e, ".memberItem", "memberItem");
                        document
                          .querySelector(".not-specify")
                          .classList.remove("selected");
                      }}
                      score={p.total_efficiency}
                      name={p.employeename}
                      img={p.photo}
                      key={`member-${index}`}
                      id={`RA${(index + 1).toString().padStart(3, 0)}`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
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
      <Button class="not-press" next="/book/book2" onClick={checkForm} />
    </form>
  );
};

export default Step1Area;
