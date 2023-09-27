import React from "react";
import { useState } from "react";
import './login.css'
import "../../components/dashboard/dashboard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { validPassWord } from "../dashboard/RegEx"


const ChangePwd = () => {
  // 定義密碼的狀態變數
  const [uppassword, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [PWData, setPWData] = useState({
    password: "",
  });


  // 儲存按鈕的點擊事件
  const handleSaveClick = async (e) => {
    e.preventDefault();

    if (newPassword === confirmPassword) {
      if (uppassword) {
      try {
        const res = await axios.post(`http://localhost:4107/member/changepwd/update/`,
          {
            uppassword: confirmPassword,
          }, {
          withCredentials: true
        });
        navigate(-1);
      } catch (error) {
        console.error("Error updating data:", error);
      }}else{
        alert("密碼格式錯誤");
      }
    } else {
      alert("密碼請一致");
    }
  };




  // 取消按鈕的點擊事件處理函數
  const handleCancelClick = () => {
    setPassword("");
    setConfirmPassword("");
    navigate(-1)
  };




  // 表單資料變更
  async function formDataChange(e) {
    const { name, value } = e.target;
    setPWData({
      ...PWData,
      [name]: value
    });

    if (name === "password") {
      setNewPassword(value);
    }
  }

  // 正規表達驗證
  function RexgeValid(name, text) {
    return name ? <span className='text-success fs-6'><i className="bi bi-check-circle">OK</i></span> : <span className='text-danger fs-6'><i className="bi bi-x-circle">{text}</i></span>;
  }

  return (
    <div className="membercontainer">
      <div className="loginrightbox">
        <div className="loginflex">
          <ul>
            <li className="loginli">
              <p>新的密碼</p>
              <input
                type="password"
                placeholder="請輸入新密碼"
                defaultValue={uppassword}
                name="password"
                required onInput={formDataChange}
                onChange={(e) => setPassword(validPassWord.test(e.target.value))}
                />
            </li>
                {RexgeValid(uppassword, "至少6個英數字包含 1 個大寫英文與小寫英文")}
            <li className="loginli">
              <p>確認密碼</p>
              <input
                type="password"
                placeholder="請再次輸入新密碼"
                name="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </li>
          </ul>
          <div>
            <button className="cancelbtn" onClick={handleCancelClick}>
              取消
            </button>
            <button className="signupbtn" onClick={handleSaveClick}>
              確認修改
            </button>
          </div>
        </div>
      </div>
      <div className="loginbg">
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default ChangePwd;
