import React from "react";
import Navbar from "../navbar";
import Footer from "../Footer";
import './login.css'
import { useState } from "react";
import Login from "./login";
import SignUp from "./signup";
import Memberlogin from "./Memberlogin";


const LoginPage = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (<>
    < Navbar />
    <div className="loginbg">
      <div className="loginContainer">
        <div className="loginSwitch">
          <div className="switchp">
            <button
              className={`tabbtn ${showLogin ? 'active' : ''}`}
              onClick={() => setShowLogin(true)}
            >
              登入
            </button>
            <button
              className={`tabbtn ${!showLogin ? 'active' : ''}`}
              onClick={() => setShowLogin(false)}
            >
              註冊
            </button>
          </div>
        </div>
        <div className="loginContent">
          {showLogin ? <Login /> : <SignUp />}
        </div>
      </div>
    </div>
  </>
  );
};

export default LoginPage;
