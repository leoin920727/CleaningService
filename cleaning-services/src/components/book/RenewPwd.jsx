import { React, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import "../../pages/book/book_style.css";
import AlertMsg from "./AlertMsg";

const RenewPwd = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [newPwd, setNewPwd] = useState(null);
  const [checkPwd, setCheckPwd] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertErr, setShowAlertErr] = useState(false);
  const [msg, setMsg] = useState("");
  const validationCode = searchParams.get("code");

  const checkPwdReg = (x, y) => {
    y = document.querySelector(x);
    document.querySelector(x + "+span").innerHTML =
      y.validity.patternMismatch === true ? "&#10005;" : "&#10003;";
  };
  const resetPwd = async (e) => {
    e.preventDefault();

    if (
      newPwd === checkPwd &&
      !document.querySelector("#setNPwd").validity.patternMismatch
    ) {
      await axios
        .post("http://localhost:4107/book/change-password", {
          validationCode,
          newPwd,
        })
        .then(() => {
          setMsg("密碼更改成功，將跳轉至登入頁面！");
          setShowAlert(true);
        })
        .catch(() => {
          setMsg("密碼更新失敗！");
          setShowAlertErr(true);
        });
    } else {
      setMsg("密碼輸入錯誤！");
      setShowAlertErr(true);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center flex-column  renewTitle">
      <h2 className="mt-5">浣熊管家</h2>
      <form className="setPwd">
        <div className="setNewPwd mb-4">
          <label htmlFor="setNewPwd" className="renewPwd_label ">
            設定密碼 <span className="text-danger"> *</span>
          </label>
          <div className="d-flex justify-content-between">
            <input
              type="password"
              id="setNPwd"
              className="renewPwd_input"
              pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$"
              placeholder="6至16字，且含大、小寫英文及數字"
              onInput={(e) => {
                setNewPwd(e.target.value);
                checkPwdReg("#setNPwd", "setNPwd");
              }}
              required
            />
            <span>{!newPwd || ""}</span>
          </div>
        </div>
        <div className="setNewPwd">
          <label htmlFor="checkNewPwd" className="renewPwd_label ">
            確認密碼<span className="text-danger"> *</span>
          </label>
          <div className="d-flex justify-content-between">
            <input
              type="password"
              id="checkNPwd"
              className="renewPwd_input"
              pattern="/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/"
              placeholder="6至16字，且含大、小寫英文及數字"
              onInput={(e) => {
                setCheckPwd(e.target.value);
              }}
              required
            />
            <span>
              {!checkPwd ? null : checkPwd === newPwd ? "\u2713" : "\u2715"}
            </span>
          </div>
        </div>
        <button id="renewPwdBtn" className="mt-5" onClick={resetPwd}>
          確認
        </button>
        {showAlert && (
          <AlertMsg
            msg={msg}
            close={() => {
              setShowAlert(false);
              window.location.replace("http://localhost:3000/loginpage");
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

export default RenewPwd;
