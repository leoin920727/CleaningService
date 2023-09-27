import "./dashboard.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UndoneOrder = (props) => {
  const limitCount = 8; //顯示幾筆
  const [number, setNumber] = useState(limitCount);
  const [start, setStart] = useState(0); //從哪開始
  const navigate = useNavigate(); //導向
  const [data, setData] = useState([]); //資料變數
  const [searchInput, setSearchInput] = useState(""); //搜尋變數
  const [orderAPI, setOrderAPI] = useState([]); //API變數
  const [toggle, setToggle] = useState(true);

  // 訂單API
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get("http://localhost:4107/orderlist");
        console.log(result);
        setOrderAPI(() => {
          return result.data.filter((data) => data.state === 1);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  // 搜尋訂單
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

  // 消除搜尋內容
  const handleClear = (e) => {
    e.target.value = "";
    setSearchInput("");
  };

  const handleOrderStatus = (state) => {
    if (state === 0) {
      return "新訂單";
    } else if (state === 1) {
      return "進行中";
    }
    return "已完成";
  };

  const prevPageClick = () => {
    setNumber(number - limitCount > 0 ? number - limitCount : limitCount);
    setStart(start - limitCount > 0 ? start - limitCount : 0);
  };
  const nextPageClick = (data) => {
    setNumber(start + limitCount < data.length ? number + limitCount : number);
    setStart(start + limitCount < data.length ? start + limitCount : start);
  };

  function handleSort(data, e, toggle) {
    let aa = e.target.id;
    const sortInfo = (data, aa, toggle) => {
      return data.slice().sort((a, b) => {
        if (typeof a[aa] === "string" && typeof b[aa] === "string") {
          const aaa = a[aa];
          const bbb = b[aa];
          if (toggle) {
            return aaa.localeCompare(bbb);
          } else {
            return bbb.localeCompare(aaa);
          }
        } else {
          if (toggle) {
            return a[aa] - b[aa];
          } else {
            return b[aa] - a[aa];
          }
        }
      });
    };

    const sortedData = sortInfo(data, aa, toggle);

    setOrderAPI(sortedData);
    setToggle(!toggle);
  }

  return (
    <div className="dashOrder">
      <div className="orderHead">
        <h3>未完成訂單</h3>
        <div style={{ position: "relative" }}>
          <img
            src="/images/search.png"
            alt="img-button"
            className="aside-img-button"
          />
          <input
            className="aside-input"
            type="text"
            placeholder="訂單查詢"
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
            <th
              id="ornumber"
              onClick={(e) => {
                handleSort(orderAPI, e, toggle);
              }}
            >
              訂單編號
            </th>
            <th
              id="employeeid"
              onClick={(e) => {
                handleSort(orderAPI, e, toggle);
              }}
            >
              員工編號
            </th>
            <th
              id="ordertime"
              onClick={(e) => {
                handleSort(orderAPI, e, toggle);
              }}
            >
              訂單日期
            </th>
            <th
              id="weeks"
              onClick={(e) => {
                handleSort(orderAPI, e, toggle);
              }}
            >
              清潔週數
            </th>
            <th
              id="donetime"
              onClick={(e) => {
                handleSort(orderAPI, e, toggle);
              }}
            >
              剩餘次數
            </th>
            <th
              id="money"
              onClick={(e) => {
                handleSort(orderAPI, e, toggle);
              }}
            >
              訂單金額
            </th>
            <th
              id="state"
              onClick={(e) => {
                handleSort(orderAPI, e, toggle);
              }}
            >
              訂單狀態
            </th>
          </tr>
        </thead>
        <tbody className="orderTbody">
          {searchInput.length > 1
            ? data
                .slice(start, number)
                .map(
                  ({
                    ornumber,
                    employeeid,
                    ordertime,
                    weeks,
                    donetime,
                    money,
                    state,
                  }) => {
                    return (
                      <tr
                        key={ornumber}
                        onClick={() => {
                          navigate(`/dashboard/AdminOrder/${ornumber}`);
                        }}
                      >
                        <td>{ornumber}</td>
                        <td>{employeeid}</td>
                        <td>
                          {new Date(ordertime).toLocaleDateString("en-CA")}
                        </td>
                        <td>{weeks}週</td>
                        <td>{`${weeks - donetime}/${weeks}次`}</td>
                        <td>{money}</td>
                        <td>{handleOrderStatus(state)}</td>
                      </tr>
                    );
                  }
                )
            : orderAPI
                .slice(start, number)
                .map(
                  ({
                    ornumber,
                    employeeid,
                    ordertime,
                    weeks,
                    donetime,
                    money,
                    state,
                  }) => {
                    return (
                      <tr
                        key={ornumber}
                        onClick={() => {
                          navigate(`/dashboard/AdminOrder/${ornumber}`);
                        }}
                      >
                        <td>{ornumber}</td>
                        <td>{employeeid}</td>
                        <td>
                          {new Date(ordertime).toLocaleDateString("en-CA")}
                        </td>
                        <td>{weeks}週</td>
                        <td>{`${weeks - donetime}/${weeks}次`}</td>
                        <td>{money}</td>
                        <td>{handleOrderStatus(state)}</td>
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
export default UndoneOrder;
