import React, { useRef, useState, useEffect } from "react";
import AuthContext, { AuthProvider } from "./AuthContext";
import {
  validPhone,
  validPassWord,
  validEmail,
  validName,
  validAge,
  validId,
} from "./SignupRegEx";
import { sendVeriCode, checkVeriCode } from "../book/utils";
import AlertMsg from "../book/AlertMsg";
// 日期選擇套件跟CSS樣式
import DatePicker from "react-date-picker";
import "./DatePicker.css";
import "./Calendar.css";

// 設定日期選擇器語言

import { addDays } from "date-fns";

import SuccessAlert from "./SuccessAlert";
import ErrorAlert from "./ErrorSignAlert";
import ErrorBirthdayAlert from "./ErrorBirthdayAlert"

import axios from "./axios";

import { isDisabled } from "@testing-library/user-event/dist/utils";

const SignUp = () => {
  const [upname, setName] = useState("");
  const [upbirthday, setBirthday] = useState("");
  const [upemail, setEmail] = useState("");
  const [upphone, setPhone] = useState("");
  const [uprural, setRural] = useState("");
  const [upid, setId] = useState(""); //身分證字號
  const [upaddress, setAddress] = useState("");
  const [uppassword, setPassword] = useState("");

  const [showErrorAlert, setErrorAlert] = useState(false);
  const [showSuccessAlert, setSuccessAlert] = useState(false);
  const [showBirthdayAlert, setBirthdayAlert] = useState(false);

  const [staffData, setStaffData] = useState({
    name: "",
    birthday: "",
    email: "",
    phone: "",
    id: "",
    address: "",
    password: "",
    rural: "中區",
  });

  const maxDate=new Date()
 

  // 送出註冊資料
  // 處理表單提交
  const handleSubmit = async (e) => {
    e.preventDefault();
    // 驗證密碼是否滿足要求
    if (true) {
      try {
        // 使用 Axios 將使用者資料發送到後端
        // 如果驗證都通過才可以送出註冊
        if (
          upname &&
          upbirthday &&
          upphone &&
          checkCode &&
          upid &&
          uppassword
        ) {
          await axios.post("/signup", JSON.stringify(staffData), {
            headers: {
              "Content-Type": "application/json",
            },
          });
          // 9/19設定跳出註冊成功的視窗
          setTimeout(() => {
            window.location.href = "http://localhost:3000/loginpage";
          }, 1500);
          setSuccessAlert(true);
          console.log(showSuccessAlert);
        } else if (showErrorAlert == false) {
          setErrorAlert(true);
          // alert("註冊錯誤")
        } else if (showErrorAlert == true) {
          setErrorAlert(false);
        }

        // 可以在這裡添加處理成功響應的程式碼
      } catch (error) {
        // 處理錯誤
        setErrorAlert(false);
        console.log(JSON.stringify(staffData));
        console.error("註冊錯誤：", error);
      }
    }
  };

  // 轉換日期
  function formatDate(e) {
    const originalDate = new Date(e);

    if (isNaN(originalDate.getTime())) {
      // 檢查是否解析日期成功
      return "無效的日期";
    }

    const year = originalDate.getFullYear();
    const month = (originalDate.getMonth() + 1).toString().padStart(2, "0"); // 月份從0開始，所以要加1，並補0
    const day = originalDate.getDate().toString().padStart(2, "0"); // 補零

    return `${year}-${month}-${day}`;
  }

  const adreessDist = [
    {
      dist: "中區",
      value: "中區",
    },
    {
      dist: "北區",
      value: "北區",
    },
    {
      dist: "南區",
      value: "南區",
    },
    {
      dist: "西區",
      value: "西區",
    },
    {
      dist: "東區",
      value: "東區",
    },
    {
      dist: "北屯區",
      value: "北屯區",
    },
    {
      dist: "南屯區",
      value: "南屯區",
    },
    {
      dist: "西屯區",
      value: "西屯區",
    },
    {
      dist: "豐原區",
      value: "豐原區",
    },
    {
      dist: "大里區",
      value: "大里區",
    },
    {
      dist: "太平區",
      value: "太平區",
    },
    {
      dist: "烏日區",
      value: "烏日區",
    },
    {
      dist: "大雅區",
      value: "大雅區",
    },
    {
      dist: "潭子區",
      value: "潭子區",
    },
    {
      dist: "新社區",
      value: "新社區",
    },
    {
      dist: "神岡區",
      value: "神岡區",
    },
    {
      dist: "龍井區",
      value: "龍井區",
    },
    {
      dist: "沙鹿區",
      value: "沙鹿區",
    },
  ];

  // 表單資料變更
  async function formDataChange(e) {
    const { name, value } = e.target;
    // const inputValue = type === 'checkbox' ? checked : value;
    setStaffData({
      ...staffData,
      [name]: value,
    });
  }

  // 正規表達驗證

  function RexgeValid(name, text) {
    return name ? (
      <span className="text-success fs-6">
        <i className="bi bi-check-circle">Success</i>
      </span>
    ) : (
      <span className="text-danger fs-6">
        <i className="bi bi-x-circle">{text}</i>
      </span>
    );
  }

  // 倒數
  const [checkCode, setCheckCode] = useState(false);
  const [userCode, setUserCode] = useState(null);
  const [workMode, setWorkMode] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [userEmail, setUserEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    let interval;
    if (workMode && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setWorkMode(false);
      setSeconds(60);
    }

    return () => clearInterval(interval);
  }, [workMode, seconds]);

  async function startCountdown(e) {
    setUserEmail(e.target.previousSibling.value);
    if (userEmail) {
      let result = await sendVeriCode(userEmail);
      if (result) {
        setWorkMode(true);
        setMsg("驗證郵件已寄送至您的信箱！");
        setShowAlert(true);
      }
    } else {
      setMsg("信箱填寫錯誤或已被註冊！");
      setShowAlert(true);
    }
  }

  return (
    <div className="loginflex  signupCalendar">
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onSubmit={handleSubmit}
      >
        <ul>
          <li className="loginli">
            <img src="./images/nameicon.png" className="loginicon" />
            <p>會員姓名</p>
            <input
              type="text"
              placeholder="請輸入姓名"
              name="name"
              autoComplete="off"
              required
              onInput={formDataChange}
              onChange={(e) => {
                const newName = e.target.value;
                setName(validName.test(e.target.value));
                setStaffData(() => ({
                  ...staffData,
                  name: e.target.value,
                }));
              }}
            ></input>
            {RexgeValid(upname, "請輸入姓名")}
          </li>

          <li className="loginli ">
            <img src="./images/date.png" className="loginicon" />
            <p>出生日期</p>
            <div className="signup">
              {/* 點當天日期加一以上都會爆掉??? 原因可能正規表達式？ */}
              {/* 也不能點選9月以上 */}
              {/* 9/19解決 原因是RegEx裡的age命名方式 */}
              <DatePicker
                calendarClassName="signup"
                name="birthday"
                maxDate={maxDate}
                value={upbirthday}
                clearIcon={null}
                onChange={(e) => {
                  const isAgeValid = validAge(formatDate(e));
                  console.log(formatDate(e));
                  setStaffData(() => ({
                    ...staffData,
                    birthday: formatDate(e),
                  }));
                  console.log(upbirthday);
                  setBirthday(
                    isAgeValid ? formatDate(e) : setBirthdayAlert(true)
                  );
                }}
              />
              {showBirthdayAlert ? <ErrorBirthdayAlert
                isOpen={showBirthdayAlert}
                onClose={() => setBirthdayAlert(false)} /> : ""}
            </div>
            {RexgeValid(upbirthday, "請選擇生日日期")}
          </li>

          <li className="loginli">
            <img src="./images/idnumber.png" className="loginicon" />
            <p>身分證號</p>
            <input
              placeholder="請輸入身分證字號"
              name="id"
              autoComplete="off"
              required
              onInput={formDataChange}
              onChange={(e) => setId(validId(e.target.value))}
            ></input>
            {RexgeValid(upid, "請輸入正確身分證字號")}
          </li>

          <li className="loginli">
            <img src="./images/tet.png" className="loginicon" />
            <p>手機號碼</p>
            <input
              type="phone"
              placeholder="請輸入手機號碼"
              name="phone"
              autoComplete="off"
              required
              onInput={formDataChange}
              onChange={(e) => setPhone(validPhone.test(e.target.value))}
            ></input>
            {RexgeValid(upphone)}
          </li>

          <li className="loginli">
            <img src="./images/icon-6.png" className="loginicon" />
            <p>居住地址</p>
            <input type="text" value="臺中市" id="cleaning-city" />

            <select
              name="rural"
              id="userAddress"
              autoComplete="off"
              required
              onInput={formDataChange}
              onChange={(e) => setRural(e.target.value)}
            >
              {adreessDist.map((item, index) => {
                return (
                  <option value={item.value} key={index}>
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
              name="address"
              autoComplete="off"
              onInput={formDataChange}
              onChange={(e) => setAddress(e.target.value)}
            />
          </li>

          <li className="loginli">
            <img src="./images/icon-4.png" className="loginicon" />
            <p>電子信箱</p>
            <input
              type="email"
              placeholder="請輸入信箱"
              name="email"
              autoComplete="off"
              required
              onInput={formDataChange}
              onChange={(e) => {
                setEmail(validEmail.test(e.target.value));
                setUserEmail(e.target.value);
              }}
            ></input>
            <input
              type="button"
              value="發送驗證碼"
              id="checkUserEmail"
              disabled={workMode}
              onClick={startCountdown}
            ></input>
            {workMode ? <span>{seconds} 秒</span> : null}
          </li>

          <li className="loginli">
            <i className="bi bi-envelope-paper myLoginIcon"></i>
            <label htmlFor="veriCode" className="myLoginLabel">
              驗證號碼&nbsp;&nbsp;
            </label>
            <input
              type="text"
              id="veriCode"
              onInput={(e) => setUserCode(e.target.value)}
              onBlur={async () => {
                let checkResult = await checkVeriCode(userCode, userEmail);
                setCheckCode(checkResult);
              }}
            />
            {RexgeValid(checkCode)}
          </li>
          {showAlert && (
            <AlertMsg
              msg={msg}
              close={() => {
                setShowAlert(false);
              }}
              showAlert={showAlert}
              setShowAlert={setShowAlert}
            />
          )}

          <li className="loginli">
            <img src="./images/password.png" className="loginicon" />
            <p>密碼&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
            <input
              type="password"
              placeholder="請輸入密碼"
              name="password"
              autoComplete="off"
              required
              onInput={formDataChange}
              onChange={(e) => setPassword(validPassWord.test(e.target.value))}
            ></input>
            {RexgeValid(uppassword, "至少6個英數字包含 1 個大寫英文與小寫英文")}
          </li>
        </ul>

        <button className="signupbtn">註冊</button>
        {showSuccessAlert ? <SuccessAlert></SuccessAlert> : false}
        {showErrorAlert ? (
          <ErrorAlert
            isOpen={showErrorAlert}
            onClose={() => setErrorAlert(false)}
          />
        ) : (
          false
        )}
      </form>
    </div>
  );
};

export default SignUp;
