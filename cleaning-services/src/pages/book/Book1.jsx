import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import BookContext from "../../../src/components/book/book-context";
import axios from "axios";
import ProgressIcon from "../../components/book/ProgressIcon";
import ProgressIconactive from "../../components/book/ProgressIconactive";
import ProgressLine from "../../components/book/ProgressLine";
import Step1Area from "../../components/book/Step1Area";
import "./book_style.css";

const Book1 = () => {
  const navigate = useNavigate();
  const ctx = useContext(BookContext);
  async function checkLogin() {
    try {
      let userInfo = await axios.get("http://localhost:4107/user", {
        withCredentials: true,
      });
      ctx.user = userInfo.data.data.user[0];
    } catch (err) {
      navigate("/loginpage");
    }
  }
  useEffect(() => {
    checkLogin();
  }, [navigate]);

  return (
    <>
      <div className="bottomArea">
        <div className="progressBar">
          <ProgressIconactive text="選擇服務" class="bi bi-hand-index-thumb" />
          <ProgressLine />
          <ProgressIcon text="選擇時段" class="bi bi-clock" />
          <ProgressLine />
          <ProgressIcon text="填寫資料" class="bi bi-file-earmark-text" />
          <ProgressLine />
          <ProgressIcon text="付款確認" class="bi bi-credit-card-2-front" />
          <ProgressLine />
          <ProgressIcon text="預約完成" class="bi bi-clipboard-check" />
        </div>
        <Step1Area />
      </div>
    </>
  );
};

export default Book1;
