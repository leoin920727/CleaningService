import Modal from "react-modal";
import "../caseshare/case";
import "./StaffInfos.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const StaffInfo = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [modal, setmodal] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4107/total/modal")
      .then((res) => {
        setmodal(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.error("no", err);
      });
  }, []);

  const formatOrName = (name) => {
    if (name === null || name === undefined) {
        return ""; // 或者其他處理方式，視情況而定
    }

    if (name.length < 2) {
        return 'x';
    }

    const firstName = name.charAt(0);
    const lastName = name.charAt(name.length - 1);
    const middleX = "x".repeat(name.length - 2);

    return `${firstName}${middleX}${lastName}`;
};


  return (
    <div>
      <div className="staffInfo-card">
        {/* 接種疫苗 */}
        <div className="staffCovid">
          <span>{props.covid ? "已接種疫苗" : "未接種疫苗"}</span>
        </div>
        {/* 員工頭像 */}
        <div className="staffImg">
          <img src={props.img} alt="staff" />
        </div>
        {/* 員工編號 */}
        <span className="staffText">
          員工編號: <span>{props.number}</span>
        </span>
        {/* 員工姓名 */}
        <span className="staffText">
          員工姓名: <span>{props.name}</span>
        </span>
        {/* 評分 */}
        <div className="staffAbility" style={{ position: "relative" }}>
          <img
            src="images\staffInfo-star.png"
            alt="star-y"
            style={{ clipPath: `inset(0 ${100 - props.star * 20}% 0 0)` }}
          />
          <img src="images\staffInfo-star2.png" alt="star-g" />
        </div>
        {/* 員工案件數 */}
        <div className="staffAbility">
          <div>
            <img src="images\staffInfo-case.png" alt="case" />
            <span>服務件數</span>
          </div>
          <span>{props.cases}件</span>
        </div>
        {/* 服務等級 */}
        <div className="staffAbility">
          <div>
            <img src="images\staffInfo-smile.png" alt="smile" />
            <span>服務等級</span>
          </div>
          <span>Levle {props.levle}</span>
        </div>
        {/* 良民證 */}
        <div className="staffAbility">
          <div>
            <img src="images\staffInfo-goodguy.png" alt="goodguy" />
            <span>{props.goodid ? "良民證" : "無良民證"}</span>
          </div>
        </div>
        {/* 浣熊管家 */}
        <div className="staffAbility">
          <div>
            <img src="images\staffInfo-raccoon.png" alt="raccoon" />
            <span>{props.racheck ? "浣熊管家認證" : "無浣熊管家認證"}</span>
          </div>
        </div>
        <button className="open-button" onClick={openModal}>
          查看更多
        </button>
      </div>

      <div>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="員工資料"
          className="memberscoreModal"
          overlayClassName="memberscoreOverlay"
        >
          <div className="memberscoreTop">
            <u>員工資料</u>
          </div>
          <div className="scorebd scoretext">
            <div className="memberlevel">
              <p>{props.modalname}</p>
              <p>Level.{props.levle}</p>
            </div>
          </div>
          <div className="scorebd">
            <img className="memberimg" src={props.modalphoto} alt="" />
            <div>
              <div className="scorepoint">
                <p>打掃技能</p>
                <img
                  src="images\staffInfo-star.png"
                  alt="star"
                  style={{
                    clipPath: `inset(0 ${100 - props.clean * 20}% 0 0)`,
                    maxWidth: "120px",
                  }}
                />
              </div>
              <div className="scorepoint">
                <p>效率技能</p>
                <img
                  src="images\staffInfo-star.png"
                  alt="star"
                  style={{
                    clipPath: `inset(0 ${100 - props.efficiency * 20}% 0 0)`,
                    maxWidth: "120px",
                  }}
                />
              </div>
              <div className="scorepoint">
                <p>細心技能</p>
                <img
                  src="images\staffInfo-star.png"
                  alt="star"
                  style={{
                    clipPath: `inset(0 ${100 - props.careful * 20}% 0 0)`,
                    maxWidth: "120px",
                  }}
                />
              </div>
              <div className="scorepoint">
                <p>態度技能</p>
                <img
                  src="images\staffInfo-star.png"
                  alt="star"
                  style={{
                    clipPath: `inset(0 ${100 - props.manner * 20}% 0 0)`,
                    maxWidth: "120px",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="scorecomment">
            <div className="customername">
              <h5>
                {formatOrName(props.orname)}{" "}
                <span className="staffAbility" style={{ position: "relative" }}>
                  <img
                    src="images\staffInfo-star.png"
                    alt="star-y"
                    style={{
                      clipPath: `inset(0 ${100 - props.stars * 20}% 0 0)`,
                    }}
                  />
                  {/* <img
                src="images\staffInfo-star2.png"
                alt="star-g"
              /> */}
                </span>
              </h5>
            </div>
            <hr />
            <div className="customercomment">{props.reply}</div>
          </div>
          <button className="modalbutton" onClick={closeModal}>
            <img src="images\modalbutton.png" width={"25"} />
          </button>
        </Modal>
      </div>
    </div>
  );
};

export default StaffInfo;
