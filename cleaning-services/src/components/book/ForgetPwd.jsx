import { React, useState } from "react";
import axios from "axios";
import AlertMsg from "./AlertMsg";

const ForgetPwd = ({ setIsForget, isForget }) => {
  const [userMail, setUserMail] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertErr, setShowAlertErr] = useState(false);
  const [msg, setMsg] = useState("");

  const sendForgetMail = async (e) => {
    e.preventDefault();
    if (!userMail) {
      setMsg("請填寫您的信箱");
      setShowAlertErr(true);
    }

    try {
      await axios.post("http://localhost:4107/book/forget-password", {
        userMail,
      });
      setShowAlert(true);
      setMsg("已成功寄送重設密碼的連結至您的信箱，此畫面將跳轉至網站首頁！");
    } catch (err) {
      if (err.response.status === 404) {
        setMsg("此信箱沒有被註冊！");
        setShowAlertErr(true);
      }
    }
  };
  return (
    <div
      className="bookAlertBg"
      onClick={(e) =>
        e.target.className === "bookAlertBg" ? setIsForget(false) : null
      }
    >
      <form className="forgetAlert">
        <p className="fs-6  mb-3 text-center">
          我們將發送修改密碼的連結至您註冊的信箱
        </p>
        <div className="d-flex justify-content-center align-items-center">
          <label>信 箱</label>
          <input
            type="email"
            placeholder="請輸入E-mail"
            className="px-2 w-75"
            onInput={(e) => {
              setUserMail(e.target.value);
            }}
            required
          />
        </div>
        <button className="bookAlertBtn" onClick={sendForgetMail}>
          確定
        </button>
        {showAlert && (
          <AlertMsg
            msg={msg}
            close={() => {
              setShowAlert(false);
              window.location.replace("http://localhost:3000");
            }}
            showAlert={showAlert}
            setShowAlert={setShowAlert}
          />
        )}
        {showAlertErr && (
          <AlertMsg
            msg={msg}
            close={(e) => {
              e.preventDefault();
              setShowAlertErr(false);
            }}
            showAlert={showAlert}
            setShowAlert={setShowAlert}
          />
        )}
      </form>
    </div>
  );
};

export default ForgetPwd;
