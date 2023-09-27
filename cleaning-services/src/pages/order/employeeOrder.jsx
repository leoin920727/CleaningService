import React, { useState, useEffect } from "react";
import "../../components/dashboard/order.css";
import Score from "../../components/dashboard/score";
import axios from "../../components/login/axios";
import { useParams } from "react-router-dom";
import UploadClearImg from "../../components/dashboard/UploadClearImg";
import ControllAccordion from "../../components/dashboard/ControllAccordion";
import MemberDone from "../../components/dashboard/MemberDone";
import { useAttendance } from "../../components/dashboard/useAttendance";




const EmployeeOrder = () => {
  const [modal, setModal] = useState(false)
  const [orderAPI, setOrderAPI] = useState('')
  const [staffAPI, setStaffAPI] = useState('')
  const [evaluateAPI, setEvaluateAPI] = useState({})
  // const [isClose, setIsclose] = useState("")
  const [updataScore, setUpdataScore] = useState(false);
  const { ornumber } = useParams()
  const { attdata } = useAttendance({ ornumber:ornumber})

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(
          `http://localhost:4107/member/${ornumber}`

        );
        setOrderAPI(() => result.data.results1[0]);//訂單資料

        setOrderAPI(() => result.data.results1[0]);//訂單資料

        setStaffAPI(() => result.data.results2[0])//員工資料

        setEvaluateAPI(() => result.data.results3[0])//評價




      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [ornumber]);
  // ornumber,
  const { note, time, donetime, weeks, orcity,userid, orrural, oraddress, state, orderdone, ordertime, orname, orphone, oremail,employeeid } = orderAPI
  const empClearData = {date:new Date().toLocaleString("en-CA"),weeks:weeks,ornumber:ornumber,donetime:donetime,employeeid:employeeid}
  function handleTime(time) {
    if (time === 0) return "08:00"
    if (time === 1) return "13:00"
    if (time === 2) return "18:00"
  }

  return (
    <>
      <h3 className="m-0 h3_DEF">浣熊訂單</h3>
      <div className="dashOrder">
        <h3 className="m-0 h3_RWD">浣熊訂單</h3>
        {updataScore && <div className="updataScore">
        </div>}
        {modal && <Score
          setUpdataScore={setUpdataScore} setModal={setModal} orderAPI={orderAPI} evaluateAPI={evaluateAPI} staffAPI={staffAPI} />}

        <div > 清潔次數：<h1 class="text-danger" style={{ display: "inline" }}>{donetime}</h1><h1 style={{ display: "inline" }} >/{weeks}次</h1></div>


        <div className="contact-table">
          <table border={1} className="w-100">
            <thead className="orderThead tbody_def">
              <tr>
                <th>訂單編號</th>
                <th>清潔地點</th>
                <th>成立時間</th>
                <th>時段</th>
                <th>備註</th>
              </tr>
            </thead>
            <tbody className="doneTbody orderDn tbody_def">
              <tr>
                <td>{ornumber}</td>
                <td>{orcity + orrural + oraddress}</td>
                <td>{new Date(ordertime).toLocaleDateString("en-CA")}</td>
                <td>{handleTime(time)}</td>
                <td>{note || "無備註"}</td>
              </tr>
            </tbody>
            <thead className="orderThead orderDn tbody_RWD">
              <tr>
                <td>訂單編號:</td>
                <td>{ornumber}</td>
              </tr>
              <tr>
                <td>清潔地點:</td>
                <td>{orcity + orrural + oraddress}</td>
              </tr>
              <tr>
                <td>成立時間:</td>
                <td>{new Date(ordertime).toLocaleDateString("en-CA")}</td>
              </tr>
              <tr>
                <td>時段:</td>
                <td>{handleTime(time)}</td>
              </tr>
              <tr>
                <td>備註:</td>
                <td>{note || "無備註"}</td>
              </tr>
            </thead>


            <thead className="orderThead tbody_def">
              <tr>
                {/* <th>服務次數</th> */}
                <th colSpan={2}>訂單狀態</th>
                <th colSpan={3}>完成時間</th>
              </tr>
            </thead>
            <tbody className="doneTbody orderDn tbody_def">
              <tr>
                <td colSpan={2}>{state === 2 ? <span className="text-success fw-bold">已完成</span> : <span className="text-danger fw-bold">進行中</span>}</td>
                {/* <td>{orderdone ? new Date(orderdone).toLocaleDateString("en-CA") : "尚未完成"}</td> */}
                <td colSpan={3}>{state === 2 && orderdone ? new Date(orderdone).toLocaleDateString("en-CA") : "尚未完成"}</td>
              </tr>
            </tbody>

            <thead className="orderThead orderDn tbody_RWD">
              <tr>
                <td>完成狀態:</td>
                <td>{state === 2 ? <span className="text-success fw-bold">已完成</span> : <span className="text-danger fw-bold">進行中</span>}</td>
              </tr>

              <tr>
                <td>完成時間:</td>
                <td>{state === 2 && orderdone ? new Date(orderdone).toLocaleDateString("en-CA") : "尚未完成"}</td>
              </tr>
            </thead>
          </table>
        </div>

        <div className="contact-table">
          <table border={1} className="w-100">
            <thead className="orderThead tbody_def">
              <tr>
                {/* <th>服務次數</th> */}
                <th>客戶姓名:</th>
                <th>客戶電話:</th>
                <th>客戶信箱:</th>
              </tr>
            </thead>
            <tbody className="doneTbody orderDn tbody_def">
              <tr>
                <td>{orname}</td>
                <td>{orphone}</td>
                <td>{oremail}</td>
              </tr>
            </tbody>

            <thead className="orderThead orderDn tbody_RWD">
              <tr>
                <td>客戶姓名:</td>
                <td>{orname}</td>              </tr>
              <tr>
                <td>客戶電話:</td>
                <td>{orphone}</td>
              </tr>
              <tr>
                <td>客戶信箱:</td>
                <td>{oremail}</td>
              </tr>
            </thead>
          </table>
        </div>
        {/*上傳圖片 */}
        {state !== 2 ? <div className="contact-table">
          <UploadClearImg empClearData={empClearData}/>
        </div>:"" }
        {attdata?.length !== 0 && <div className="contact-table">
            <div className="ControllAccordion col-12" style={{ overflow: "auto" }}>
                <ControllAccordion items={attdata} Accordion={MemberDone}  />
            </div> 
          </div>}
      </div >
    </>);
};

export default EmployeeOrder;