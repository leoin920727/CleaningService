import React, { useState, useEffect } from "react";
import axios from "../login/axios";
import DashBoardAlert from "./DashBoardAlert";

const UploadClearImg = ({ empClearData }) => {
  const [imageData, setImageData] = useState([]);
  const [imagesUp, setImagesUp] = useState(null);
  const [dateTime, setDateTime] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [success, setSuccess] = useState("");

  const handleImagesUp = () => {
    if (imagesUp !== null) {
      const formData = new FormData();

      const jsonString = JSON.stringify(empClearData);

      formData.append("data", jsonString);

      for (const item of imagesUp) {
        formData.append("photo", item);
      }

      axios.put("/updata/orderdoneimages", formData);
      setSuccess("success");
    } else {
      setSuccess("failed");
    }
  };

  useEffect(() => {
    if (success) {
      setShowAlert(true);
    }
  }, [success, showAlert]);

  const handleImagePut = (e) => {
    const images = [...e.target.files].map((file) => {
      return {
        name: file.name,
        url: URL.createObjectURL(file),
      };
    });
    setImagesUp(e.target.files);
    setImageData(images);
  };

  setInterval(() => {
    setDateTime(new Date().toLocaleString());
  });

  const handleClickImg = (e) => {
    setIsOpen(!isOpen);
    setImgSrc(e.target.src);
  };

  const imgDiv = (src) => {
    return (
      <div
        className="DashBoardAlert-shell"
        onClick={(prevfalse) => setIsOpen(false)}
      >
        <div
          className="DashBoardAlert orderTbody"
          style={{ width: "40%", height: "40%" }}
        >
          <img
            src={src}
            alt="img"
            style={{ objectFit: "contain" }}
            className="w-100 h-100"
          />
        </div>
      </div>
    );
  };

  return (
    <form>
      {showAlert && (
        <DashBoardAlert
          Cancel={"請放上完成照片"}
          checkout={"打掃完成!!"}
          message={success}
          onClose={() => {
            window.location.reload();
          }}
        />
      )}
      {isOpen && imgDiv(imgSrc)}
      <label className="orderBtn" htmlFor="lable">
        <input
          multiple
          style={{ display: "none" }}
          onInput={handleImagePut}
          id="lable"
          type="file"
          accept="image/*"
        />
        <div>請依序放入清潔前和清潔後照片</div>
      </label>
      <span>※上傳圖片一次最多8張</span>
      <div style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
        {imageData &&
          imageData.map((file, index) => {
            if ((index + 1) % 2 !== 0) {
              return (
                <div key={index} className="clearImgDiv">
                  <span>清掃前</span>
                  <img
                    onClick={handleClickImg}
                    src={file.url}
                    style={{ cursor: "pointer" }}
                    className="orderImages w-100"
                    alt="orderImages"
                  />
                </div>
              );
            } else {
              return (
                <div key={index} className="clearImgDiv2">
                  <span>清掃後</span>
                  <img
                    onClick={handleClickImg}
                    src={file.url}
                    style={{ cursor: "pointer" }}
                    className="orderImages w-100"
                    alt="orderImages"
                  />
                </div>
              );
            }
          })}
      </div>
      <div className="w-100">
        <button
          className="orderBtn"
          type="button"
          onClick={() => {
            handleImagesUp();
          }}
        >
          打掃完成
        </button>
        {/* <span
          className="me-0"
          style={{
            border: "1px solid black",
            borderRadius: "3px",
            padding: "2px",
          }}
        >
          現在時間:{dateTime}
        </span> */}
        {/*拍完影片在打開*/}
      </div>
    </form>
  );
};
export default UploadClearImg;
