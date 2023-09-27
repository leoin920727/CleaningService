import React, { Component } from "react";
import { Link } from "react-router-dom";

class indexbg extends Component {
  state = {};
  btn = {
    backgroundColor: "#ffc107",
    height: "3em",
    width: "15em",
    color: "#664D03",
    top: "15%",
    left: "10%"
  };



  render() {
    return (

      <div className='d-flex  justify-content-center  position-relative'
        style={{ paddingTop: "10em" }}>


        {/* 背景圖片 */}
        <img src='images/background.png'
          alt=""
          className='img-fluid '
          style={{ width: '100vw', height: 'auto' }} />


        {/* 文字及預約按鈕 */}
        <div className="d-flex row   justify-content-center position-absolute"
          style={{ top: "15%", left: "5%" }}>
          <h1 className="h2" style={{ color: "#3F3350", textAlign: "center" }}>
            浣熊管家<br />讓你有個乾淨的家
          </h1>
          <Link to="/book" style={{ justifyContent: "center", display: "flex", textDecoration: "none" }}>
            <button className='btn'
              style={this.btn}>
              立即預約
            </button>
          </Link>

        </div>

        {/* 圓形圖片 */}
        <div className="position-absolute d-none d-xl-block"
          style={{ top: '0%', right: "40%" }}>
          <img
            src="images/circleImage1.webp"
            alt=""
            className='rounded-circle border border-2 border-white '
            style={{ width: '300px', height: '300px', boxShadow: '3px 10px 20px 0px rgba(0, 0, 0, 0.20)' }} />
        </div>



        <div className="position-absolute d-none d-xl-block"
          style={{ right: "20%", top: "15%" }}>
          <img
            src="images/circleImage2.webp"
            alt=""
            // border-2 border-white  shadow  rounded
            className='rounded-circle border border-2 border-white'
            style={{ width: '250px', height: '250px', boxShadow: '3px 10px 20px 0px rgba(0, 0, 0, 0.20)' }} />
        </div>


      </div>






    );
  }
}

export default indexbg;
