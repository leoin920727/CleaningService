import React from "react";
import './case.css';
import Navbar from "../navbar";
import Footer from "../Footer";

import CardContainer from "./Cardcontainer";
import Case2 from "./Case2";



const Case = () => {

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="caseTitle">
          <h2>案例分享</h2>
        </div>
        <CardContainer />
        </div>
        <Case2/>
      <Footer />
    </>
  );
}




export default Case;