import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DashBoardAlert from "./DashBoardAlert";
import {
  validTel,
  validPassWord,
  validEmail,
  validName,
  validId,
} from "./RegEx";

const AddStaff = () => {
  const navigate = useNavigate();
  const [orderAPI, setOrderAPI] = useState([]);
  const [imageData, setImageData] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const [nameReg, setNameReg] = useState(false);
  const [emailReg, setEmailReg] = useState(false);
  const [phoneReg, setPhoneReg] = useState(false);
  const [passWordReg, setPassWordReg] = useState(false);
  const [IDReg, setIDReg] = useState(false);

  const [success, setSuccess] = useState("");
  const [imgSrc, setImgSrc] = useState("");

  const [staffDate, setStaffData] = useState({
    employeeId: "",
    empLength: "",
    employeeName: "",
    employeePhone: "",
    employeeMail: "",
    employeePW: "",
    employeeIdNumber: "",
    employeeBirthDay: "",
    empRural: "中區",
    empAddress: "",
    racheck: 0,
    vaccine: 0,
    goodId: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const address = await axios.get(
          `http://localhost:4107/dashboard/addstaff`
        );
        const staff = await axios.get(
          `http://localhost:4107/dashboard/StaffList`
        );
        setStaffData((staffDate) => {
          return { ...staffDate, empLength: staff.data.length };
        });
        setOrderAPI(address.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
    if (success) {
      setShowAlert(true);
    }
  }, [success, showAlert]);

  //    送出註冊資料
  async function handleSignUp(e) {
    e.preventDefault();
    if (nameReg && emailReg && phoneReg && passWordReg && IDReg) {
      const jsonString = JSON.stringify(staffDate); //formData.append()不能直接加入物件要轉換JSON字串
      const formData = new FormData();
      formData.append("data", jsonString);
      formData.append("photo", imageData);
      try {
        const res = await axios.post(
          `http://localhost:4107/dashboard/addstaff/upload`,
          formData
        );

        if (res.data.message === "failed") {
          setSuccess("failed");
        } else if (res.data.message === "success") {
          setSuccess("success");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      setSuccess("failed");
    }
  }

  // 設定上傳檔案
  function handleImagePut(e) {
    const imageUpdata = e.target.files[0];
    setImageData(imageUpdata);
    if (e.target.files) setImgSrc(URL.createObjectURL(e.target.files[0]));
  }

  // 表單資料變更
  async function formDataChange(e) {
    const { name, value } = e.target;
    // const inputValue = type === 'checkbox' ? checked : value;
    setStaffData({
      ...staffDate,
      [name]: value,
    });
  }

  // 正規表達驗證
  function RexgeValid(name, text = "輸入格式有誤") {
    return name ? (
      <span className="text-success" style={{ fontSize: "0.5rem" }}>
        <i className="bi bi-check-circle">Success</i>
      </span>
    ) : (
      <span className="text-danger" style={{ fontSize: "0.5rem" }}>
        <i className="bi bi-x-circle">{text}</i>
      </span>
    );
  }

  return (
    <div className="dashOrder">
      <div className="orderHead">
        <h3>員工註冊</h3>
      </div>
      <form onSubmit={handleSignUp}>
        <div className="orderContainer">
          <div className="orderContent">
            <ol>
              {/* 姓名 */}
              <li>員工姓名:</li>
              <li>
                <input
                  type="text"
                  name="employeeName"
                  autoComplete="off"
                  required
                  onInput={formDataChange}
                  onChange={(e) => setNameReg(validName.test(e.target.value))}
                />
              </li>
              {RexgeValid(nameReg, "請輸入6 ~ 10 字中英文組成")}
              {/* 身分證字號 */}
              <li>身分證字號:</li>
              <li>
                <input
                  type="text"
                  name="employeeIdNumber"
                  autoComplete="off"
                  required
                  onInput={formDataChange}
                  onChange={(e) => setIDReg(validId(e.target.value))}
                />
              </li>
              {RexgeValid(IDReg, "身分證格式錯誤")}
              {/* 電話 */}
              <li>聯絡方式:</li>
              <li>
                <input
                  type="tel"
                  name="employeePhone"
                  autoComplete="off"
                  required
                  onInput={formDataChange}
                  onChange={(e) => setPhoneReg(validTel.test(e.target.value))}
                />
              </li>
              {RexgeValid(phoneReg, "請輸入手機或家用電話")}
              {/* 生日 */}
              <li>出生年月日:</li>
              <li>
                <input
                  type="date"
                  name="employeeBirthDay"
                  autoComplete="off"
                  required
                  onChange={formDataChange}
                />
              </li>
              {/* 信箱 */}
              <li>E-mail:</li>
              <li>
                <input
                  type="email"
                  name="employeeMail"
                  autoComplete="off"
                  required
                  onInput={formDataChange}
                  onChange={(e) => setEmailReg(validEmail.test(e.target.value))}
                />
              </li>
              {RexgeValid(emailReg, "請輸入正確的信箱格式")}
              {/* 密碼 */}
              <li>密碼:</li>
              <li>
                <input
                  type="password"
                  name="employeePW"
                  autoComplete="off"
                  required
                  onInput={formDataChange}
                  onChange={(e) =>
                    setPassWordReg(validPassWord.test(e.target.value))
                  }
                />
              </li>
              {RexgeValid(passWordReg, "請輸入6 ~ 16 字中英文組成")}
            </ol>
            <ol>
              <li>疫苗接種:</li>
              <li>
                <label htmlFor="vaccineYES">是</label>
                <input
                  type="radio"
                  name="vaccine"
                  id="vaccineYES"
                  value={1}
                  required
                  onChange={formDataChange}
                />
                <label htmlFor="vaccineNO">否</label>
                <input
                  type="radio"
                  name="vaccine"
                  id="vaccineNO"
                  value={0}
                  required
                  onChange={formDataChange}
                />
              </li>
              <li>良民證:</li>
              <li>
                <label htmlFor="goodIdYES">是</label>
                <input
                  type="radio"
                  name="goodId"
                  id="goodIdYES"
                  value={1}
                  required
                  onChange={formDataChange}
                />
                <label htmlFor="goodIdNO">否</label>
                <input
                  type="radio"
                  name="goodId"
                  id="goodIdNO"
                  value={0}
                  required
                  onChange={formDataChange}
                />
              </li>
              <li>公司認證:</li>
              <li>
                <label htmlFor="racheckYES">是</label>
                <input
                  type="radio"
                  name="racheck"
                  id="racheckYES"
                  value={1}
                  required
                  onChange={formDataChange}
                />
                <label htmlFor="racheckNO">否</label>
                <input
                  type="radio"
                  name="racheck"
                  id="racheckNO"
                  value={0}
                  required
                  onChange={formDataChange}
                />
              </li>
              <li>地址:</li>
              <li>
                <input
                  type="text"
                  name="empCity"
                  defaultValue={"臺中市"}
                  disabled
                />
                <select
                  name="empRural"
                  defaultValue={"南屯區"}
                  required
                  onChange={formDataChange}
                >
                  {orderAPI.map((dist, index) => {
                    return (
                      <option value={dist.dist} key={index}>
                        {dist.dist}
                      </option>
                    );
                  })}
                </select>
                <input
                  name="empAddress"
                  type="text"
                  autoComplete="off"
                  required
                  onInput={formDataChange}
                />
              </li>
              <li>上傳頭像</li>
              <li>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  required
                  onChange={(e) => handleImagePut(e)}
                />
              </li>
              {imgSrc && (
                <img
                  src={imgSrc}
                  alt="img"
                  className="orderStaff mt-2"
                  style={{ width: "150px", height: "150px" }}
                />
              )}
            </ol>
          </div>
          <div
            style={{ position: "relative", width: "100%", textAlign: "center" }}
          >
            <button className="btn btn-primary ms-0" type="submit">
              送出
            </button>
            <button
              className="btn btn-danger ms-0"
              onClick={() => {
                navigate("/dashboard/stafflist", { replace: true });
              }}
            >
              取消
            </button>
          </div>
          {showAlert && (
            <DashBoardAlert
              Cancel={"註冊失敗"}
              checkout={"註冊成功"}
              message={success}
              onClose={() => {
                navigate("/dashboard/stafflist", { replace: true });
              }}
            />
          )}
        </div>
      </form>
    </div>
  );
};
export default AddStaff;
