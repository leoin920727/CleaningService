import React from "react";
import "./question.css";
import Navbar from "../navbar";
import Footer from "../Footer";
import Questionbook from "./Questionbook";
const Question = () => {
  const qubook = [
    {
      imgSrc: "images/Q-001.png",
      content: "付款方式目前採用信用卡支付。",
    },
    {
      imgSrc: "images/q-002.png",
      content:
        "對的，目前因人手狀況只提供台中服務，未來如有擴展其他區域將於官網通知，敬啟等候！",
    },
    {
      imgSrc: "images/q-003.png",
      content:
        "空氣中的污染物或有害粒子會留在室內。定期清潔除了能避免刺激過敏之外，也能維持良好的生活品質、照顧您的健康！",
    },
    {
      imgSrc: "images/q-004.png",
      content:
        "不需要，除了第一次服務時，我們希望客戶在場告知個人的居家習慣外，爾後我們的服務專員可以在客戶外出前到宅開始服務。",
    },
    {
      imgSrc: "images/q-005.png",
      content:
        "我們的服務專員都是受過專業的清潔訓練，針對您不滿意的地方即時改善達到您的要求，請您別擔心。",
    },
    {
      imgSrc: "images/q-006.png",
      content:
        "您可以與服務專員做適度的溝通，將不滿意的情形告知公司，客服人員將依狀況做適度的處理，若仍無法解決您的問題，將為您做人員更換。",
    },
    {
      imgSrc: "images/q-007.png",
      content: "不需要。我們服務專員每次到府服務時均會自備。",
    },
    {
      imgSrc: "images/q-008.png",
      content:
        "可以指定服務專員，如遇到特殊狀況（病假、事假），門市會另外與您協調其他人員為您繼續服務。",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="d-flex align-items-center justify-content-center flex-column">
        <div className="container d-flex align-items-center justify-content-center flex-column">
          <div className="question">常見問題</div>

          <div className="question-row d-flex align-items-center justify-content-center">
            {qubook.map((book, index) => (
              <Questionbook key={index} {...book} />
            ))}
          </div>

          <div className="question-line">
            <div className=" d-flex  justify-content-center flex-column lines">
              <p>還有想了解的嗎 ?</p>
              <p>歡迎加入我們官方Line與我們聯繫 !</p>
              <div className=" d-flex align-items-center ">
                <img
                  className="line-img"
                  src="images/question-002.png"
                  width="150px"
                />
                <ul className="question-icon">
                  <li>
                    <a href="#">
                      <img src="images/question-003.png" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="images/question-004.png" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="images/question-005.png" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="images/question-006.png" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <img className="Raccoon" src="images/question-007.png" />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default Question;
