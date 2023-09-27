import axios from "axios";

export const scroll = () => {
  document.body.classList.add("smooth");
  window.scrollBy(0, 150);
};

export const sendVeriCode = async (userMail) => {
  try {
    await axios.post("http://localhost:4107/book/send-vericode", { userMail });
    return true;
  } catch {
    return false;
  }
};

export const checkVeriCode = async (code, userMail) => {
  try {
    await axios.post("http://localhost:4107/book//verify-code", {
      code,
      userMail,
    }); // code mail參數
    return true;
  } catch {
    return false;
  }
};
