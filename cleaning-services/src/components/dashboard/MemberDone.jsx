import React, { useState } from 'react'
import "./dashboard.css";

function MemberDone({ item, active, onClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState('');

  const getOrderDay = () => { 
    const day = new Date().getDay(item.date) + 1;
    switch (day) {
      case 1:
        return "一";
      case 2:
        return "二";
      case 3:
        return "三";
      case 4:
        return "四";
      case 5:
        return "五";
      case 6:
        return "六";
      case 7:
        return "日";
      default:
        return "未知";
    }
  }

  function getOrderDoneImages(){ 
    return String(item.orderphoto).split(",")
  }
  const orderImages = getOrderDoneImages();

  const handleClickImg = (e) => { 
    setIsOpen(!isOpen)
    setImgSrc(e.target.src)
  }
  
  const imgDiv = (src) => { 
    return (
        <div className='DashBoardAlert-shell' onClick={prevfalse => setIsOpen(false)}>
            <div className="DashBoardAlert orderTbody" style={{ width: "40%",height:"40%" }}>
                <img src={src} alt="img" style={{objectFit:"contain"}} className='w-100 h-100'/>
        </div>
    </div>
    )
}
  
  return (
    <>
      {isOpen && imgDiv(imgSrc)}
      {item && <div
      className={`staff-accordion ${active ? "active" : ""}`}
      onClick={onClick}
    >
      <div className="staff-header">
        {`${ new Date(item.donetime).toLocaleString() || ""}`}
      </div>
    </div>}
      {active && <div className="staff-content animated-accordion">
        {orderImages && orderImages.map((data, index) => (index+1)%2 !==0 ?<div key={index} style={{marginTop:"2px" ,marginLeft:"2px",border:"1px solid black",borderRight:"0px",display:"block",padding:"5px", width:"100px"}}><span>清掃前</span><img onClick={handleClickImg} src={data} className="orderImages w-100" alt="orderImages" /></div>
        :<div  key={index} style={{marginTop:"2px" ,marginRight:"2px" ,borderLeft:"0px" ,border:"1px solid black",display:"block",padding:"5px", width:"100px"}}><span>清掃後</span><img src={data} onClick={handleClickImg} style={{cursor:"pointer"}} className="orderImages w-100" alt="orderImages" /></div>
        )}
      </div>}
    </>);
}

export default MemberDone;
