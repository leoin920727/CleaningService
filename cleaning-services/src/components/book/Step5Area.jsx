import { React, useEffect } from "react";
import { scroll } from "./utils";

const Step5Area = () => {
  useEffect(() => scroll());

  return (
    <div
      className="book-step1 flex-column align-items-center container "
      id="book-step5"
    >
      <div id="book5-top">
        <i className="bi bi-check-circle me-2"></i>
        <h5>預約完成！</h5>
      </div>
      <p className="mt-2 fs-5">
        我們會將訂單詳細內容寄至您的電子信箱，您也可以在會員專區中查詢您的訂單。
      </p>
      <div id="book5-bottom">
        <img src="/images/raccoon.gif" alt="raccoon" />
      </div>
    </div>
  );
};

export default Step5Area;
