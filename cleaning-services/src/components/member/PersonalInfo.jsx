import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../../components/member/member.css";
import DashBoardAlert from "../dashboard/DashBoardAlert"
const PersonalInfo = () => {
  const { userid } = useParams();
  const [memberData, setMemberData] = useState({});
  const [addBlackList, setAddBlackList] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [why, setWhy] = useState("");
  const [edit, setEdit] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [success, setSuccess] = useState("");
  const [banInfo, setBanInfo] = useState({success:"",falied:""})
  const navigate = useNavigate();
  // 編輯變數
  const [upName, setUpName] = useState("");
  const [upId, setUpId] = useState("");
  const [upPhone, setUpPhone] = useState("");
  const [upAddress, setUpAddress] = useState("");
  const [upEmail, setUpEmail] = useState("");
  const [upPassWord, setUpPassWord] = useState("");
  const [changePW, setchangePW] = useState(true); //變更密碼
  const [upAdmin, setUpAdmin] = useState("");
  const [upBirthDay, setUpBirthDay] = useState("");
  const [upRural, setUpRural] = useState("");
  const [dist, setdist] = useState("");
  const [useridarr, setUserIdArr] = useState("");

  //接收資料
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(
          `http://localhost:4107/dashboard/PersonalInfo/${userid}`
        );
        if (result) {
          setMemberData(result.data.data[0]);
          setWhy(result.data.why[0].why || "");
          setUpName(result.data.data[0].name);
          setUpId(result.data.data[0].id);
          setUpPhone(result.data.data[0].phone);
          setUpAddress(result.data.data[0].address);
          setUpEmail(result.data.data[0].email);
          setUpRural(result.data.data[0].rural);
          setUpAdmin(result.data.data[0].admin);
          setUpPassWord(result.data.newPW);
          setdist(result.data.address);
          setUpBirthDay(
            new Date(result.data.data[0].birthday).toLocaleDateString("en-CA")
          );
          setUserIdArr(() => {
            const arr = result.data.len.map((obj) => obj.userid);
            return arr;
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [userid]);

  //   上一頁
  const prevPage = () => {
    const data = useridarr[useridarr.indexOf(userid) - 1];
    const res = data ? data : userid;
    navigate(`/dashboard/PersonalInfo/${res}`);
  };
  //   下一頁
  const nextPage = () => {
    const data = useridarr[useridarr.indexOf(userid) + 1];
    const res = data ? data : userid;
    navigate(`/dashboard/PersonalInfo/${res}`);
  };

  // 加黑名單
  function handleBlacklist() {
    setAddBlackList(!addBlackList);
  }

  // 送出黑名單理由
  function sendBlackList() {
    try {
      axios.put(
        `http://localhost:4107/dashboard/PersonalInfo/blacklist/${userid}`,
        { why: inputValue }
      );
      setAddBlackList(!addBlackList);
      setInputValue("");
      setBanInfo({success:"黑名單成功",falied:"黑名單失敗"})
      setSuccess("success")
      setShowAlert(true)
    } catch (error) {
      console.error("Error updata data:", error);
    }
  }

  // 解除黑名單
  async function deleteBlackList() {
    try {
      await axios.put(
        `http://localhost:4107/dashboard/PersonalInfo/removeblacklist/${userid}`,
        { userid: userid }
      );
      await axios.delete(
        `http://localhost:4107/dashboard/PersonalInfo/removeblacklist/${userid}`,
        { userid: userid }
      );
      setBanInfo({success:"解除成功",falied:"解除失敗"})
      setSuccess("success")
      setShowAlert(true)
    } catch (error) {
      console.error("Error updata data:", error);
    }
  }

  // 資料更新送出
  async function handleSendEdit() {
    try {
      await axios.put(
        `http://localhost:4107/dashboard/PersonalInfo/update/${userid}`,
        {
          upName: upName,
          upId: upId,
          upPhone: upPhone,
          upRural: upRural,
          upAddress: upAddress,
          upEmail: upEmail,
          upPassWord: upPassWord,
          upAdmin: upAdmin,
          upBirthDay: upBirthDay,
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Error updata data:", error);
    }
  }

  // 刪除資料
  async function deleteInfo() {
    const confirmDelete = window.confirm("確定要刪除此資料嗎？");
    if (confirmDelete) {
      try {
        navigate(`/dashboard/PersonalInfo`);
        await axios.delete(
          `http://localhost:4107/dashboard/PersonalInfo/delete/${userid}`
        );
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  }
  function ChangeDateType(e) {
    const btd = new Date(e.target.value).toLocaleDateString("en-CA");
    setUpBirthDay(btd);
  }

  const {
    name,
    birthday,
    phone,
    email,
    id,
    password,
    city,
    rural,
    address,
    admin,
    blacklist,
  } = memberData;

  const btd = new Date(birthday).toLocaleDateString("en-CA");

  return (
    <div>
      <div className="Container">
        <h3 className="orderh3">會員資料</h3>
        <div className="orderContainer">
          {edit ? (
            <div className="orderContent">
              <ol>
                <li>會員姓名:</li>
                <li>
                  <input
                    type="text"
                    defaultValue={name}
                    onChange={(e) => setUpName(e.target.value)}
                    pattern=".{2,20}"
                    required={true}
                  />
                </li>
                <li>會員編號:</li>
                <li>
                  <input type="text" defaultValue={userid} disabled={true} />
                </li>
                <li>身分證字號:</li>
                {/* 假驗證 */}
                <li>
                  <input
                    type="text"
                    defaultValue={id}
                    onChange={(e) => setUpId(e.target.value)}
                    pattern="^[A-Za-z]\d{9}$"
                    required={true}
                  />
                </li>
                <li>出生年月日:</li>
                <li>
                  <input
                    type="date"
                    defaultValue={btd}
                    onChange={(e) => ChangeDateType(e)}
                  />
                </li>
                <li>聯絡方式:</li>
                <li>
                  <input
                    type="tel"
                    defaultValue={phone}
                    onChange={(e) => setUpPhone(e.target.value)}
                    pattern="^09[0-9]{8}$"
                    required={true}
                  />
                </li>
              </ol>
              <ol>
                <li>地址:</li>
                <li>
                  <input type="text" defaultValue={city} disabled={true} />
                  <select
                    defaultValue={upRural}
                    required={true}
                    onChange={(e) => setUpRural(e.target.value)}
                  >
                    {dist.map((dist, index) => {
                      return (
                        <option value={dist.dist} key={index}>
                          {dist.dist}
                        </option>
                      );
                    })}
                  </select>{" "}
                  <input
                    type="text"
                    defaultValue={address}
                    onChange={(e) => setUpAddress(e.target.value)}
                    required={true}
                  />
                </li>
                <li>E-mail:</li>
                <li>
                  <input
                    type="email"
                    defaultValue={email}
                    onChange={(e) => setUpEmail(e.target.value)}
                    required={true}
                  />
                </li>
                <li>密碼:</li>
                <li>
                  {changePW ? (
                    <input
                      type="button"
                      value={"新密碼"}
                      onClick={() => setchangePW(!changePW)}
                    />
                  ) : (
                    <input
                      type="password"
                      placeholder="數字,大小寫英文,6-12個密碼"
                      defaultValue={""}
                      onChange={(e) => setUpPassWord(e.target.value)}
                      pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$"
                      required={true}
                    />
                  )}
                </li>
                <li>權限:</li>
                <li>
                  <select
                    defaultValue={admin}
                    onChange={(e) => setUpAdmin(e.target.value)}
                  >
                    <option value="0">一般會員</option>
                    <option value="1">管理者</option>
                  </select>
                </li>
                <li>黑名單:</li>
                <li>
                  {blacklist ? (
                    <span className="text-danger fw-bold">黑名單:{why}</span>
                  ) : (
                    <span className="text-success fw-bold">正常用戶</span>
                  )}
                </li>
              </ol>
            </div>
          ) : (
            <div className="orderContent">
              <ol>
                <li>會員姓名:</li>
                <li>{name}</li>
                <li>會員編號:</li>
                <li>{userid}</li>
                <li>身分證字號:</li>
                <li>{id}</li>
                <li>出生年月日:</li>
                <li>{btd}</li>
                <li>聯絡方式:</li>
                <li>{phone}</li>
              </ol>
              <ol>
                <li>地址:</li>
                <li>{city + rural + address}</li>
                <li>E-mail:</li>
                <li>{email}</li>
                <li>密碼:</li>
                <li>{password}</li>
                <li>權限:</li>
                <li>{admin ? "管理者" : "一般會員"}</li>
                <li>黑名單:</li>
                <li>
                  {blacklist ? (
                    <span className="text-danger fw-bold">黑名單:{why}</span>
                  ) : (
                    <span className="text-success fw-bold">正常用戶</span>
                  )}
                </li>
              </ol>
            </div>
          )}
          {edit ? (
            // 編輯按鈕
            <div
              style={{
                position: "relative",
                width: "100%",
                textAlign: "center",
              }}
            >
              <button
                className="btn btn-secondary"
                onClick={() => setEdit(!edit)}
              >
                取消編輯
              </button>
              <button className="btn btn-primary" onClick={handleSendEdit}>
                完成編輯
              </button>
              <br />
              <button className="btn btn-danger" onClick={deleteInfo}>
                刪除此資料
              </button>
            </div>
          ) : (
            // 正常按鈕
            <div
              style={{
                position: "relative",
                width: "100%",
                textAlign: "center",
              }}
            >
              {addBlackList ? (
                <div className="blacklist-content">
                  <label htmlFor="black">{`"${name}"`}加入黑名單的原因:</label>
                  <input
                    type="text"
                    id="black"
                    className="w-100"
                    autoComplete="off"
                    value={inputValue}
                    onInput={(e) => {
                      setInputValue(e.target.value);
                    }}
                  />
                  <button
                    className="btn btn-primary ms-0"
                    onClick={sendBlackList}
                  >
                    送出
                  </button>
                  <button
                    className="btn btn-danger ms-0"
                    onClick={() => {
                      setAddBlackList(!addBlackList);
                      setInputValue("");
                    }}
                  >
                    取消
                  </button>
                </div>
              ) : (
                ""
              )}
              {blacklist ? (
                <button className="btn btn-success" onClick={deleteBlackList}>
                  解除黑名單
                </button>
              ) : (
                <button className="btn btn-danger" onClick={handleBlacklist}>
                  加入黑名單
                </button>
              )}
              <button
                className="btn btn-primary"
                onClick={() => setEdit(!edit)}
              >
                編輯資料
              </button>
            </div>
          )}
        </div>
        <div className="btncontain">
          <button onClick={prevPage}>上一頁</button>
          <button onClick={nextPage}>下一頁</button>
        </div>
      </div>
      {showAlert && <DashBoardAlert checkout={banInfo.success}  Cancel={banInfo.falied} message={success} onClose={()=>{navigate("/dashboard/stafflist",{ replace: true })}}/>}
    </div>
  );
};

export default PersonalInfo;
