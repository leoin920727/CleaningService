import React from "react";
import { useEffect, useState } from "react";
import './login.css'
import "../../components/dashboard/dashboard.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { validPhone } from "../dashboard/RegEx"
const Memberlogin = () => {
  const { employeeid } = useParams();
  const [memberData, setMemberData] = useState({});
  const [edit, setEdit] = useState(false);
  // 編輯變數
  const [upPhone, setUpPhone] = useState("")
  const [upAddress, setUpAddress] = useState("")
  const [upRural, setUpRural] = useState("")
  const [dist, setdist] = useState("")
  const [success, setSuccess] = useState("");



  //接收資料
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(`http://localhost:4107/employeelist/employeeinfo/`, {
          withCredentials: true
        });

        if (result.data && result.data.data && result.data.data[0]) {
          setMemberData(result.data.data[0]);
          setUpPhone(result.data.data[0].phone);
          setUpAddress(result.data.data[0].address);
          setUpRural(result.data.data[0].rural);
          setdist(result.data.address);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [employeeid]);

  // 資料更新送出
  async function handleSendEdit(e) {
    e.preventDefault();

    if (upPhone) {
      try {
        const res = await axios.post(`http://localhost:4107/employeelist/employeeinfo/update/`, memberData, {
          withCredentials: true
        });

        if (res.data.message === "failed") {
          setSuccess("failed");
        } else if (res.data.message === "success") {
          setSuccess("success");
        }
        window.location.reload();
      } catch (error) {
        console.error("Error updating data:", error);
      }
    } else {
      alert("電話格式錯誤");
    }
  }



  // 表單資料變更
  async function formDataChange(e) {
    const { name, value } = e.target;
    // const inputValue = type === 'checkbox' ? checked : value;
    setMemberData({
      ...memberData,
      [name]: value
    })
  }


  const {
    employeename,
    employeebirthday,
    employeeidnumber,
    employeephone,
    employeeemail,
    empcity,
    emprural,
    empaddress
  } = memberData;

  const btd = new Date(employeebirthday).toLocaleDateString('en-CA')

  // 正規表達驗證
  function RexgeValid(name) {
    return name ? <span className='text-success fs-6'><i className="bi bi-check-circle">Success</i></span> : <span className='text-danger fs-6'><i className="bi bi-x-circle">Failed</i></span>;
  }


  // 如果處於編輯模式，渲染編輯表單，否則渲染會員資料
  return (
    <div className="membercontainer">
      <div className="loginrightbox">
        <div className="loginflex">
          {edit ?

            // 編輯模式下的表單
            <ul>
              <li className="loginli">
                <img src="/images/nameicon.png" className="loginicon" />
                <p>浣熊姓名</p>
                <input value={employeename} disabled="disabled" />
              </li>
              <li className="loginli">
                <img src="/images/date.png" className="loginicon" />
                <p>出生日期</p>
                <input value={btd} disabled="disabled" />
              </li>
              <li className="loginli">
                <img src="/images/idnumber.png" className="loginicon" />
                <p>身份證號</p>
                <input value={employeeidnumber} disabled="disabled" />
              </li>
              <li className="loginli">
                <img src="/images/tet.png" className="loginicon" />
                <p>手機號碼</p>
                <input
                  type="tel"
                  name='employeephone'
                  defaultValue={employeephone}
                  autoComplete="off" required onInput={formDataChange}
                  onChange={(e) => setUpPhone(validPhone.test(e.target.value))}
                />
                {RexgeValid(upPhone)}
              </li>
              <li className="loginli">
                <img src="/images/icon-4.png" className="loginicon" />
                <p>電子信箱</p>
                <input value={employeeemail} disabled="disabled" />
              </li>
              <li className="loginli">
                <img src="/images/icon-6.png" className="loginicon" />
                <p>居住地址</p>
                <input type="text" defaultValue={empcity} disabled={true} />
                <select name="emprural" defaultValue={emprural} required onInput={formDataChange} onChange={(e) => setUpRural(e.target.value)} >
                  {dist.map((dist, index) => {
                    return (
                      <option value={dist.dist} key={index}>
                        {dist.dist}
                      </option>
                    );
                  })}
                </select> <input name="empaddress" type="text" defaultValue={empaddress} required onInput={formDataChange} onChange={(e) => setUpAddress(e.target.value)} />
              </li>
            </ul>
            :
            // 顯示會員資料
            <ul>
              <li className="loginli">
                <img src="/images/nameicon.png" className="loginicon" />
                <p>浣熊姓名</p>
                <input value={employeename} disabled="disabled" />
              </li>
              <li className="loginli">
                <img src="/images/date.png" className="loginicon" />
                <p>出生日期</p>
                <input value={btd} disabled="disabled" />
              </li>
              <li className="loginli">
                <img src="/images/idnumber.png" className="loginicon" />
                <p>身份證號</p>
                <input value={employeeidnumber} disabled="disabled" />
              </li>
              <li className="loginli">
                <img src="/images/tet.png" className="loginicon" />
                <p>手機號碼</p>
                <input
                  value={employeephone}
                  disabled="disabled"
                ></input>
              </li>
              <li className="loginli">
                <img src="/images/icon-4.png" className="loginicon" />
                <p>電子信箱</p>
                <input value={employeeemail} disabled="disabled"></input>
              </li>
              <li className="loginli">
                <img src="/images/icon-6.png" className="loginicon" />
                <p>居住地址</p>
                <input
                  type="text"
                  value={empcity}
                  id="cleaning-city"
                  disabled="disabled"
                />
                <input
                  type="text"
                  value={emprural}
                  id="cleaning-city"
                  disabled="disabled"
                />
                <input
                  type="text"
                  value={empaddress}
                  id="detail-address"
                  required
                  disabled="disabled"
                />
              </li>
            </ul>
          }

          <div>
            {edit ?
              // 顯示儲存和取消按鈕
              <>
                <button className="cancelbtn" onClick={() => setEdit(!edit)}>
                  取消
                </button>
                <button className="signupbtn" onClick={handleSendEdit}>
                  確認修改
                </button>
              </>
              :
              // 顯示編輯按鈕
              <button className="revisebtn" onClick={() => setEdit(!edit)}>
                修改
              </button>
            }
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



export default Memberlogin;