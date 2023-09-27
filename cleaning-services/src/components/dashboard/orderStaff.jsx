import "./order.css";

function ContactCard({staffAPI,evaluateAPI}) {  

const {employeeid,employeename,photo,employeephone,employeeemail}=staffAPI
console.log(evaluateAPI)
  return (
    <div style={{ backgroundColor: "#FFF8E1" }}>
      <div className="contact-table grid gap-0 row-gap-3 d-flex row">
        {/* d-flex col-lg-4 col-sm-12 align-items-sm-center */}
          <div className="d-flex justify-content-center col-lg-4">
            <img src={photo} alt="staffImage" className="contact-image" />
          </div>
          <div className="d-flex flex-column col-lg-4 col-sm-12 align-items-start">
            <div className="row">浣熊專員：{employeename}</div>
            <div className="row">浣熊編號：{employeeid}</div>
            <div className="row">聯絡電話：{employeephone}</div>
            <div className="row">聯絡信箱：{employeeemail}</div>
          </div>
          <div className="p-0 col-lg-4 col-sm-12">
            <div className="d-flex">
              <span>清潔能力：</span>
              {evaluateAPI?.clean ?
                <div style={{position:"relative"}}>
                  <img src="/images/staffInfo-star.png" alt="star-y" style={{ clipPath: `inset(0 ${100 - evaluateAPI.clean * 20}% 0 0)` }} />
                <img src="/images/staffInfo-star2.png" alt="star-g" style={{position: "absolute"}}/>
                </div>: ""}
            </div>
            <div className="d-flex">
              <span>清潔效率：</span>
              {evaluateAPI?.clean ?
                <div style={{position:"relative"}}>
                  <img src="/images/staffInfo-star.png" alt="star-y" style={{ clipPath: `inset(0 ${100 - evaluateAPI.efficiency * 20}% 0 0)` }} />
                  <img src="/images/staffInfo-star2.png" alt="star-g" style={{position: "absolute"}}/>
                </div>: ""}
            </div>
            <div className="d-flex">
              <span>服務態度：</span>
              {evaluateAPI?.clean ?
                <div style={{position:"relative"}}>
                  <img src="/images/staffInfo-star.png" alt="star-y" style={{ clipPath: `inset(0 ${100 - evaluateAPI.manner * 20}% 0 0)` }} />
                  <img src="/images/staffInfo-star2.png" alt="star-g" style={{position: "absolute"}}/>
                </div>: ""}
            </div>
            <div className="d-flex">
              <span>謹慎細心：</span>
              {evaluateAPI?.clean ?
                <div style={{position:"relative"}}>
                  <img src="/images/staffInfo-star.png" alt="star-y" style={{ clipPath: `inset(0 ${100 - evaluateAPI.careful * 20}% 0 0)` }} />
                  <img src="/images/staffInfo-star2.png" alt="star-g" style={{position: "absolute"}}/>
                </div>: ""}
            </div>
          </div>
        </div>
    </div>
  );
}

export default ContactCard;
