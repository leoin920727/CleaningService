import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from "swiper/react";
import StaffInfo from "./StaffInfo";
import "swiper/css";

const StaffInfos = () => {
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:4107/total/sta'),
      axios.get('http://localhost:4107/total/modal'),
      axios.get('http://localhost:4107/total/stars'),
    ])
      .then((responses) => {
        const cardData = responses[0].data; //第一個API
        const modalData = responses[1].data;  //第二個API
        const starsData = responses[2].data;  //第三個API

        const combined = cardData.map((employee) => {
          // 在 modalData 中尋找相同的 employeeid
          const modalItem = modalData.find((modalEmployee) => modalEmployee.employeename === employee.employeename) || {};
          const starsItem = starsData.find((starsEmployee) => starsEmployee.employeeid === employee.employeeid) || {};

          return {
            ...employee,
            modalData: modalItem,
            total_efficiency: starsItem.total_stars
          };
        });

        setCombinedData(combined); //合併後的資料
      })
      .catch((err) => {
        console.error('no', err);
      });
  }, []);

  return (
    <div className="container">
      <div className="process-top staffInfo-title">
        <h3 className="title">員工評價 Staff evaluation</h3>
        <img src="images/flower.png" alt="" />
      </div>
      <Swiper
        loop={false}
        spaceBetween={0}
        slidesPerView={1}
        freeMode={true}
        breakpoints={{
          1200: {
            slidesPerView: 4,
          },
          992: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 2,
          },
          576: {
            slidesPerView: 1,
          },
        }}
      >
        {combinedData.map((employee) => (
          <SwiperSlide key={employee.employeeid}>
            <StaffInfo
              name={employee.employeename}  //卡片名字
              covid={employee.vaccine}      //卡片疫苗
              star={employee.total_efficiency}  //卡片星星數
              number={employee.employeeid} //卡片員工編號
              cases={employee.cases} //卡片服務件數
              levle={employee.total_ratings} //卡片服務等級
              img={employee.photo} 
              goodid={employee.goodid}  //卡片良民證
              racheck={employee.racheck} //卡片認證
              reply={employee.modalData.reply} //modal 評價
              orname={employee.modalData.orname} //modal 顧客名字
              clean={employee.modalData.e2} //modal 打掃技能
              efficiency={employee.modalData.e1} //modal 效率技能
              careful={employee.modalData.e3} //modal 細心技能
              manner={employee.modalData.e4}  //modal 態度技能
              modalphoto={employee.modalData.photo}
              modalname={employee.modalData.employeename}
              stars={employee.total_efficiency} //modal顧客評價總星星
            />
          </SwiperSlide>
        ))}
      </Swiper>


    </div>
  );
};

export default StaffInfos;