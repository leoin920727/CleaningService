import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BookContext from "./book-context";
import Button from "./Button";
import AlertMsg from "./AlertMsg";

const Step4Area = () => {
  const weeks = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  const navigate = useNavigate();
  const ctx = useContext(BookContext);
  const time = ["08:00", "13:00", "18:00"];
  const [price, setPrice] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertErr, setShowAlertErr] = useState(false);
  const [msg, setMsg] = useState("");
  const [url, setUrl] = useState("");

  let checkForm = async (e) => {
    e.preventDefault();
    let { user } = ctx;
    if (user === null) {
      setMsg("發生了點小問題，請重新填寫表單！");
      setUrl("/book");
      setShowAlertErr(true);
      return;
    }
    const cardNumber = "0000-1111-2222-3333";
    const monthYear = "10/23";
    const securityCode = "357";
    let cardInput = document.querySelectorAll(
      ".creaditCard input[type='text']"
    );
    let agreeCheck = document.querySelector("#agree");
    let card = ``;
    for (let i = 0; i < 4; i++) {
      card += cardInput[i].value + "-";
    }
    card = card.substring(0, 19);
    if (
      card === cardNumber &&
      cardInput[4].value === monthYear &&
      cardInput[5].value === securityCode
    ) {
      if (!agreeCheck.checked) {
        setMsg("請確實閱讀並勾選服務條款與隱私權政策!");
        setShowAlert(true);
      } else {
        const {
          employeeid,
          date,
          time,
          weeks,
          phone,
          email,
          city,
          rural,
          address,
          name,
          note,
        } = ctx;
        const result = await axios.post(
          "http://localhost:4107/book/new-order",
          {
            uid: ctx.user.userid,
            employeeid,
            date,
            time,
            weeks,
            phone,
            email,
            city,
            rural,
            address,
            name,
            note,
          },
          {
            withCredentials: true,
          }
        );
        setTimeout(() => {
          setMsg("付款成功！");
          setUrl("/book/book5");
          setShowAlertErr(true);
          // alert(`付款成功！`);
          // window.location.replace("/book/book5");
        }, 2000);
      }
    } else {
      setMsg("付款失敗!");
      setShowAlert(true);
      // alert("付款失敗!");
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4107/book/price?week=${ctx.weeks}`, {
        withCredentials: true,
      })
      .then((res) => {
        setPrice(res.data[0].price);
      })
      .catch((err) => {
        console.log(err);
      }, []);
  });
  return (
    <>
      <form className="container d-flex  justify-content-center align-items-center flex-column">
        <div className="d-flex container justify-content-center align-items-center book-step1">
          <div className="left book4-left show-form">
            <table id="book4-order">
              <tr>
                <th colspan="2">訂單內容</th>
              </tr>
              <tr>
                <td className="fw-bold">清潔頻率</td>
                <td>每週一次</td>
              </tr>
              <tr>
                <td className="fw-bold">清潔週數</td>
                <td>{ctx.weeks} 週</td>
              </tr>
              <tr>
                <td className="fw-bold">服務時間</td>
                <td>
                  {weeks[ctx.week]}　{time[ctx.time]}
                </td>
              </tr>
              <tr>
                <td className="fw-bold">開始日期</td>
                <td>{ctx.date}</td>
              </tr>
              <tr>
                <td className="fw-bold">訂單金額</td>
                <td>{price} 元</td>
              </tr>
            </table>
          </div>
          <div className="right show-form">
            <div className="book4-pay ">
              <div className="payMethod">
                <label htmlFor="pay-method">付款方式</label>
                <select name="payMethod" id="pay-method">
                  <option value="payInFull">信用卡一次付清</option>
                </select>
              </div>
              <div className="d-flex justify-content-center my-3">
                <div className="creaditCard d-flex flex-column align-items-start ">
                  <label htmlFor="creaditCard-number" className="mt-2">
                    信用卡號碼
                  </label>
                  <div className="mt-2">
                    <input
                      id="creaditCard-number"
                      className="ms-0"
                      type="text"
                      placeholder="****"
                      pattern="[0-9]{4}"
                      maxLength={4}
                      required
                    />
                    -
                    <input
                      type="text"
                      placeholder="****"
                      pattern="[0-9]{4}"
                      maxLength={4}
                      required
                    />
                    -
                    <input
                      type="text"
                      placeholder="****"
                      pattern="[0-9]{4}"
                      maxLength={4}
                      required
                    />
                    -
                    <input
                      type="text"
                      placeholder="****"
                      pattern="[0-9]{4}"
                      maxLength={4}
                      required
                    />
                  </div>
                  <div className="mt-4 mb-2">
                    <label htmlFor="deadline">有效月 / 年</label>
                    <input
                      id="deadline"
                      type="text"
                      placeholder="MM/YY"
                      pattern="(0[1-9]|1[0-2])/(2[3-9]|3[0-9])"
                      maxLength={5}
                      required
                    />
                    <label htmlFor="securityCode">背面末三碼</label>
                    <input
                      id="securityCode"
                      type="text"
                      placeholder="***"
                      pattern="[0-9]{3}"
                      maxLength={3}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="book4-comment show-form">
            <input type="checkbox" name="isAgree" id="agree" required />
            我已閱讀 <u>非清潔服務範圍</u>、<u>取消或更改服務政策</u>、
            <u>服務條款</u> 及 <u>隱私權政策</u>
          </div>
          {showAlert && (
            <AlertMsg
              msg={msg}
              close={() => setShowAlert(false)}
              showAlert={showAlert}
              setShowAlert={setShowAlert}
            />
          )}
          {showAlertErr && (
            <AlertMsg
              msg={msg}
              close={() => {
                setShowAlertErr(false);
                navigate(url);
              }}
            />
          )}
        </div>
        <Button pre="/book/book3" next="/book/book5" onClick={checkForm} />
      </form>
    </>
  );
};

export default Step4Area;
