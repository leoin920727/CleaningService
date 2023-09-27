import React from "react";

const Footer = () => {
  return (
    <div className="footer-team">
      <div className="footer-img">
        <img src="./images/go.png" />

        <div>
          <ul className="footer-icon">
            <li>
              <a href="#">
                <img src="./images/1.png" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="./images/2.png" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="./images/3.png" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="./images/4.png" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="item">
        <ul>
          <li className="colo">Navigation</li>
          <br />
          <li>
            <a href="/about" className="footer-a">公司介紹</a>
        </li>
        <li>
          <a href="/service"className="footer-a">服務項目
          </a>
        </li>
        <li>
          <a href="/case" className="footer-a">案例分享</a>
        </li>
        <li>
          <a href="/question" className="footer-a">常見問題
          </a>
        </li>
      </ul>

      <ul>
        <li className="colo">Quick Links</li>
        <br />
        <li>
          <a href="#" className="footer-a">
            隱私權政策
          </a>
        </li>
        <li>
          <a href="#" className="footer-a">
            加入我們
          </a>
        </li>
      </ul>

      <ul>
        <li className="colo">Contact Info</li>
        <br />
        <li>
          <img src="./images/5.png" />
        </li>
        <li>
          <img src="./images/6.png" />
        </li>
        <li>
          <img src="./images/7.png" />
        </li>
      </ul>
    </div>
    </div >
  );
};
export default Footer;