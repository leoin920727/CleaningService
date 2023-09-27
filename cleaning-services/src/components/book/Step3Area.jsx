import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BookContext from "./book-context";
import Button from "./Button";
import AlertMsg from "./AlertMsg";

const Step3Area = () => {
  const navigate = useNavigate();
  const ctx = useContext(BookContext);
  const checkDataNum = document.querySelectorAll(
    "#clientInfo input:not(#same):not(#notes)"
  );
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertErr, setShowAlertErr] = useState(false);
  const [dist, setDist] = useState([]);
  const [infoCheck, setInfoCheck] = useState(false);

  const checkedMember = (event) => {
    setInfoCheck(event.target.checked);
  };

  const checkPhone = () => {
    let phone = document.querySelector("#userPhone");
    document.querySelector("#userPhone+span").innerHTML =
      phone.validity.patternMismatch === true ? "&#10005;" : "&#10003;";
    ctx.phone = phone.value;
  };
  const checkName = () => {
    let name = document.querySelector("#userName");
    document.querySelector("#userName+span").innerHTML =
      name.validity.patternMismatch === true ? "&#10005;" : "&#10003;";
    ctx.name = name.value;
  };

  useEffect(() => {
    const phone = document.querySelector("#userPhone");
    const name = document.querySelector("#userName");
    const email = document.querySelector("#userMail");
    const city = document.querySelector("#cleaning-city");
    const address = document.querySelector("#detail-address");
    const ruralOptions = document.querySelectorAll("#userAddress>option");

    if (infoCheck) {
      let { user } = ctx;
      if (user === null) {
        return setShowAlertErr(true);
      }
      phone.value = user.phone;
      ctx.phone = user.phone;
      name.value = user.name;
      ctx.name = user.name;
      email.value = user.email;
      city.value = user.city;
      address.value = user.address;

      ruralOptions.forEach((option) => {
        option.selected = option.value === user.rural ? true : false;
      });
    } else {
      phone.value = "";
      name.value = "";
      email.value = "";
      city.value = "臺中市";
      address.value = "";
    }
  }, [infoCheck]);

  useEffect(() => {
    axios
      .get("http://localhost:4107/book/dist", {
        withCredentials: true,
      })
      .then((res) => {
        setDist(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  let checkForm = (e) => {
    e.preventDefault();
    let check = Array.from(checkDataNum).every((ele) => {
      return ele.value;
    });
    if (check) {
      ctx.email = document.querySelector("#userMail").value;
      ctx.rural = document.querySelector("#userAddress").value;
      ctx.address = document.querySelector("#detail-address").value;
      ctx.note = document.querySelector("#notes").value;
      navigate("/book/book4");
    } else {
      setShowAlert(true);
    }
  };

  return (
    <>
      <form className="d-flex flex-column align-items-center container ">
        <div className=" book-step3 container">
          <div id="clientInfo" className="show-form">
            <div className="sameMember">
              <input
                type="checkbox"
                name="isSame"
                id="same"
                onChange={checkedMember}
              />
              <label htmlFor="same">同會員基本資料</label>
            </div>
            <div>
              <img src="/images/staffInfo-raccoon.png" alt="icon" />
              <label htmlFor="userName">
                姓　　名 <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                placeholder="請輸入姓名"
                pattern=".{2,20}"
                id="userName"
                required
                onChange={checkName}
              />
              <span>&nbsp;</span>
            </div>
            <div>
              <img src="/images/phone.png" alt="icon" />
              <label htmlFor="userPhone">
                手機號碼 <span className="text-danger">*</span>
              </label>
              <input
                id="userPhone"
                type="tel"
                placeholder="09********"
                pattern="^09[0-9]{8}$"
                required
                onChange={checkPhone}
              />
              <span>&nbsp;</span>
            </div>
            <div>
              <img src="/images/mail.png" alt="icon" />
              <label htmlFor="userMail">
                電子信箱 <span className="text-danger">*</span>
              </label>
              <input
                id="userMail"
                type="email"
                placeholder="abc123@gmail.com"
                required
              />
            </div>
            <div className="d-flex align-items-center flex-wrap book3-address ">
              <img src="/images/address.png" alt="icon" />
              <label htmlFor="userAddress">
                清掃地址 <span className="text-danger">*</span>
              </label>

              <div className="d-flex align-items-center detail-address ">
                <input type="text" value="臺中市" id="cleaning-city" />
                <select name="cleaningAddress" id="userAddress">
                  {dist.map((item, index) => {
                    return (
                      <option value={item.dist} key={index}>
                        {item.dist}
                      </option>
                    );
                  })}
                </select>

                <input
                  type="text"
                  placeholder="請輸入詳細地址"
                  id="detail-address"
                  required
                />
              </div>
            </div>
            <div>
              <img src="/images/info.png" alt="icon" />
              <label htmlFor="notes">
                訂單備註 <span className="text-white">*</span>
              </label>
              <input type="text" id="notes" />
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
        <Button pre="/book/book2" next="/book/book4" onClick={checkForm} />
      </form>
    </>
  );
};

export default Step3Area;
