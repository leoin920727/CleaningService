import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../components/member/member.css";
import { useNavigate } from "react-router-dom";
import ControllAccordion from "./ControllAccordion";
import StaffAccordion from "./StaffAccordion";

const StaffListInfo = () => {
  const { employeeid } = useParams();
  const [staffData, setStaffData] = useState({});
  const [items, setItems] = useState({});
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  // 編輯變數
  const [upName, setUpName] = useState("");
  const [upPhone, setUpPhone] = useState("");
  const [upEmail, setUpEmail] = useState("");
  const [upVaccine, setUpVaccine] = useState("");
  const [upGoodid, setUpGoodid] = useState("");
  const [upRacheck, setUpRacheck] = useState("");
  const [upPassWord, setUpPassWord] = useState("");
  const [upIdnumber, setUpIdnumber] = useState("");
  const [upBirthday, setUpBirthday] = useState("");
  const [upRural, setUpRural] = useState("");
  const [upAddress, setUpAddress] = useState("");
  const [changePW, setchangePW] = useState(true); //變更密碼
  const [addressAPI, setAddressAPI] = useState("");
  const [useridarr, setUserIdArr] = useState("");

  //接收資料
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(
          `http://localhost:4107/dashboard/StaffList/${employeeid}`
        );
        setStaffData(result.data.data[0]); //員工資料
        setItems(result.data.list); //訂單紀錄
        setUpName(result.data.data[0].employeename);
        setUpPhone(result.data.data[0].employeephone);
        setUpEmail(result.data.data[0].employeeemail);
        setUpVaccine(result.data.data[0].vaccine);
        setUpGoodid(result.data.data[0].goodid);
        setUpRacheck(result.data.data[0].racheck);
        // setUpPassWord(result.data.data[0].employeepw);
        setUpIdnumber(result.data.data[0].employeeidnumber);
        setUpBirthday(
          new Date(result.data.data[0].employeebirthday).toLocaleDateString(
            "en-CA"
          )
        );
        setUpRural(result.data.data[0].emprural);
        setUpAddress(result.data.data[0].empaddress);
        setAddressAPI(result.data.address);
        setUserIdArr(() => {
          const arr = result.data.useridarr.map((obj) => obj.employeeid);
          return arr;
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [employeeid]);

  //   上一頁
  const prevStaffClick = () => {
    const data = useridarr[useridarr.indexOf(employeeid) - 1];
    const res = data ? data : employeeid;
    navigate(`/dashboard/StaffList/${res}`);
  };
  //   下一頁
  const nextStaffClick = () => {
    const data = useridarr[useridarr.indexOf(employeeid) + 1];
    const res = data ? data : employeeid;
    navigate(`/dashboard/StaffList/${res}`);
  };

  // 資料更新送出
  async function handleSendEdit() {
    try {
      await axios.put(
        `http://localhost:4107/dashboard/StaffList/update/${employeeid}`,
        {
          upName: upName,
          upPhone: upPhone,
          upEmail: upEmail,
          upVaccine: upVaccine,
          upGoodid: upGoodid,
          upRacheck: upRacheck,
          upPassWord: upPassWord,
          upIdnumber: upIdnumber,
          upBirthday: upBirthday,
          upRural: upRural,
          upAddress: upAddress,
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
        navigate(`/dashboard/StaffList`);
        await axios.delete(
          `http://localhost:4107/dashboard/StaffList/delete/${employeeid}`
        );
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  }

  const {
    employeename,
    employeephone,
    employeeemail,
    photo,
    vaccine,
    goodid,
    racheck,
    cases,
    employeepw,
    employeebirthday,
    empcity,
    emprural,
    empaddress,
    employeeidnumber,
  } = staffData;

  const btd = new Date(employeebirthday).toLocaleDateString("en-CA");
  return (
    <div>
      <div className="Container">
        <h3 className="orderh3">員工資料</h3>
        <div className="orderContainer">
          {edit ? (
            <div className="orderContent">
              <ol>
                <img
                  src={String(photo).split(",")[0]}
                  alt="asd"
                  className="orderStaff"
                />
                <li>員工編號:</li>
                <li>
                  <input
                    type="text"
                    defaultValue={employeeid}
                    disabled={true}
                  />
                </li>
                <li>疫苗接種:</li>
                <li>
                  <input
                    type="checkbox"
                    defaultChecked={upVaccine === 1}
                    onChange={(e) => {
                      setUpVaccine(e.target.checked ? 1 : 0);
                    }}
                    required={true}
                  />
                  接種疫苗
                </li>
                <li>良民證:</li>
                <li>
                  <input
                    type="checkbox"
                    checked={upGoodid === 1}
                    onChange={(e) => {
                      setUpGoodid(e.target.checked ? 1 : 0);
                    }}
                    required={true}
                  />
                  無犯罪紀錄
                </li>
                <li>racheck:</li>
                <li>
                  <input
                    type="checkbox"
                    defaultChecked={upRacheck === 1}
                    onChange={(e) => {
                      setUpRacheck(e.target.checked ? 1 : 0);
                    }}
                    required={true}
                  />
                  是否認證
                </li>
                <li>案件數:</li>
                <li>
                  <input type="number" defaultValue={cases} disabled={true} />
                </li>
              </ol>
              <ol>
                <li>員工姓名:</li>
                <li>
                  <input
                    type="text"
                    defaultValue={employeename}
                    onChange={(e) => setUpName(e.target.value)}
                    pattern=".{2,20}"
                    required={true}
                  />
                </li>
                <li>E-mail:</li>
                <li>
                  <input
                    type="email"
                    defaultValue={employeeemail}
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
                <li>聯絡方式:</li>
                <li>
                  <input
                    type="tel"
                    defaultValue={employeephone}
                    onChange={(e) => setUpPhone(e.target.value)}
                    pattern="^09[0-9]{8}$"
                    required={true}
                  />
                </li>
                <li>地址:</li>
                <li>
                  <input type="text" defaultValue={empcity} disabled={true} />
                  <select
                    defaultValue={upRural}
                    required={true}
                    onChange={(e) => setUpRural(e.target.value)}
                  >
                    {addressAPI.map((item, index) => {
                      return (
                        <option value={item.dist} key={index}>
                          {item.dist}
                        </option>
                      );
                    })}
                  </select>{" "}
                  <input
                    type="text"
                    defaultValue={empaddress}
                    onChange={(e) => setUpAddress(e.target.value)}
                    required={true}
                  />
                </li>
                <li>身分證字號:</li>
                {/* 假驗證 */}
                <li>
                  <input
                    type="text"
                    defaultValue={employeeidnumber}
                    onChange={(e) => setUpIdnumber(e.target.value)}
                    pattern="^[A-Za-z]\d{9}$"
                    required={true}
                  />
                </li>
                <li>出生年月日:</li>
                <li>
                  <input
                    type="date"
                    defaultValue={upBirthday}
                    onChange={(e) => setUpBirthday(e.target.value)}
                  />
                </li>
              </ol>
            </div>
          ) : (
            <div className="orderContent">
              <ol>
                <img
                  src={String(photo).split(",")[0]}
                  alt="asd"
                  className="orderStaff"
                />
                <li>員工編號:</li>
                <li>{employeeid}</li>
                <li>疫苗接種:</li>
                <li>{vaccine ? "已接種" : "未接種"}</li>
                <li>良民證:</li>
                <li>{goodid ? "無犯罪紀錄" : "有案底"}</li>
                <li>racheck:</li>
                <li>{racheck ? "浣熊公司認證會員" : "無認證"}</li>
                <li>案件數:</li>
                <li>{cases}件</li>
              </ol>
              <ol>
                <li>員工姓名:</li>
                <li>{employeename}</li>
                <li>E-mail:</li>
                <li>{employeeemail}</li>
                <li>密碼:</li>
                <li>{employeepw}</li>
                <li>聯絡方式:</li>
                <li>{employeephone}</li>
                <li>地址:</li>
                <li>{empcity + emprural + empaddress}</li>
                <li>身分證字號:</li>
                <li>{employeeidnumber}</li>
                <li>出生年月日:</li>
                <li>{btd}</li>
              </ol>
            </div>
          )}
          {/* 視窗開關 */}
          {edit ? (
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
            <div>
              <button
                className="btn btn-success"
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                員工歷史訂單
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setEdit(!edit)}
              >
                編輯資料
              </button>
            </div>
          )}

          {/* 彈跳視窗 */}
          {isOpen && (
            <div className="staffOrderList">
              <h3 className="orderh3" style={{ textAlign: "center" }}>
                歷史訂單
              </h3>
              <div className="ControllAccordion" style={{ overflow: "auto" }}>
                <ControllAccordion items={items} Accordion={StaffAccordion} />
              </div>
              <button
                className="btn btn-danger staff-listBtn"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                X
              </button>
            </div>
          )}
        </div>

        <div className="orderBtn-group">
          <div className="orderBtn" onClick={prevStaffClick}>
            上一頁
          </div>
          <div className="orderBtn" onClick={nextStaffClick}>
            下一頁
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffListInfo;
