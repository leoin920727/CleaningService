import React from "react";

const Process = () => {
  return (
    <div className="container process">
      <div className="process-list">
        <div className="steps">
          <div className="icons">
            <i className="bi bi-file-earmark-text-fill"></i>
          </div>
          <div className="step">
            <h5>填寫表單</h5>
            <p>挑選您期望的服務與時間</p>
            <i className="icons bi bi-arrow-down"></i>
          </div>
        </div>
        <div className="steps">
          <div className="icons">
            <i className=" bi bi-credit-card-fill"></i>
          </div>
          <div className="step">
            <h5>確認付款</h5>
            <p>線上刷卡方便又快速</p>
            <i className="icons bi bi-arrow-down"></i>
          </div>
        </div>
        <div className="steps">
          <div className="icons">
            <i className="fa-solid fa-broom"></i>
          </div>
          <div className="step">
            <h5>到府清潔</h5>
            <p>當天專員提早十分鐘抵達</p>
            <i className="icons bi bi-arrow-down"></i>
          </div>
        </div>
        <div className="steps">
          <div className="icons">
            <i className="bi bi-clipboard-check-fill"></i>{" "}
          </div>
          <div className="step">
            <h5>服務驗收</h5>
            <p>完成訂單與給予評價</p>
          </div>
        </div>
      </div>
      <div className="process-img">
        <img src="./images/clean2.jpg" />
      </div>
    </div>
  );
};

export default Process;
