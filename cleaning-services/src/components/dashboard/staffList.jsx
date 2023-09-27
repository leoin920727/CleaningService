import "../dashboard/dashboard.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSortableData from "../dashboard/useSortInfo";

const StaffList = (props) => {
  const limitCount = 8; //顯示幾筆
  const [number, setNumber] = useState(limitCount);
  const [start, setStart] = useState(0); //從哪開始
  const navigate = useNavigate(); //導向
  const [data, setData] = useState([]); //資料變數
  const [searchInput, setSearchInput] = useState(""); //搜尋變數
  const [orderAPI, setOrderAPI] = useState([]); //API變數
  const { sortedData, handleSort } = useSortableData(orderAPI);

  // 會員資料API
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(
          "http://localhost:4107/dashboard/StaffList/"
        );
        setOrderAPI(() => {
          return result.data;
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  //   搜尋訂單
  const searchItem = (searchvalue) => {
    setSearchInput(searchvalue);
    if (searchvalue !== "") {
      const filterData = orderAPI.filter((obj) => {
        return Object.values(obj).some((value) =>
          String(value).toLowerCase().includes(searchvalue.toLowerCase())
        );
      });
      setData(filterData);
    } else {
      setData(orderAPI);
    }
  };

  //   消除搜尋內容
  const handleClear = (e) => {
    e.target.value = "";
    setSearchInput("");
  };

  // 換頁
  const prevPageClick = () => {
    setNumber(number - limitCount > 0 ? number - limitCount : limitCount);
    setStart(start - limitCount > 0 ? start - limitCount : 0);
  };
  const nextPageClick = (data) => {
    setNumber(start + limitCount < data.length ? number + limitCount : number);
    setStart(start + limitCount < data.length ? start + limitCount : start);
  };

  return (
    <div className="dashOrder">
      <div className="orderHead">
        <h3>員工資料</h3>
        <div style={{ position: "relative" }}>
          <img
            src="/images/search.png"
            alt="img-button"
            className="aside-img-button"
          />
          <input
            className="aside-input"
            type="text"
            placeholder="會員查詢"
            onClick={handleClear}
            onChange={(e) => {
              searchItem(e.target.value);
            }}
          />
        </div>
      </div>
      <table>
        <thead className="orderThead">
          <tr id="orderTh">
            <th onClick={() => {setOrderAPI(handleSort("employeeid"))}}>員工編號</th>
            <th onClick={() => {setOrderAPI(handleSort("employeename"))}}>姓名</th>
            <th onClick={() => {setOrderAPI(handleSort("employeephone"))}}>連絡電話</th>
            <th onClick={() => {setOrderAPI(handleSort("employeeemail"))}}>Email</th>
            <th onClick={() => {setOrderAPI(handleSort("cases"))}}>服務件數</th>
            <th onClick={() => {setOrderAPI(handleSort("goodid"))}}>良民證</th>
            <th onClick={() => {setOrderAPI(handleSort("racheck"))}}>浣熊認證</th>
          </tr>
        </thead>
        <tbody className="orderTbody">  
          {searchInput.length > 1
            ? data
              .slice(start, number)
              .map(
                ({
                  employeeid,
                  employeename,
                  employeephone,
                  employeeemail,
                  goodid,
                  racheck,
                  cases,
                }) => {
                  return (
                    <tr
                      key={employeeid}
                      onClick={() => {
                        navigate(`/dashboard/StaffList/${employeeid}`);
                      }}
                    >
                      <td>{employeeid}</td>
                      <td>{employeename}</td>
                      <td>{employeephone}</td>
                      <td>{employeeemail}</td>
                      <td>{cases}</td>
                      <td>{goodid}</td>
                      <td>{racheck}</td>
                    </tr>
                  );
                }
              )
            : orderAPI
              .slice(start, number)
              .map(
                ({
                  employeeid,
                  employeename,
                  employeephone,
                  employeeemail,
                  goodid,
                  racheck,
                  cases,
                }) => {
                  return (
                    <tr
                      key={employeeid}
                      onClick={() => {
                        navigate(`/dashboard/StaffList/${employeeid}`);
                      }}
                    >
                      <td>{employeeid}</td>
                      <td>{employeename}</td>
                      <td>{employeephone}</td>
                      <td>{employeeemail}</td>
                      <td>{cases}</td>
                      <td>{goodid}</td>
                      <td>{racheck}</td>
                    </tr>
                  );
                }
              )}
        </tbody>
      </table>
      <div className="orderBtn-group">
        <div className="orderBtn" onClick={() => prevPageClick()}>
          上一頁
        </div>
        <div className="orderBtn" onClick={() => nextPageClick(orderAPI)}>
          下一頁
        </div>
      </div>
    </div>
  );
};
export default StaffList;
