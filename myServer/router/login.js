var express = require("express");
var db = require("../db");
var cors = require("cors");
const Decrypt = require("../middleware/Decrypt");
var login = express.Router();







// 登入後使用此API獲得資料
// 透過判斷 req.session.isLogin 是否為 true 來確認是否有權限呼叫此 API
login.get("/user", (req, res) => {
  if (!req.session.isLogin) {
    return res.status(403).send({ status: 1, msg: "無權進行此操作" });
  }
  res.send({
    status: 0,
    msg: "獲取成功",
    username: req.session.user.email,
    data: req.session,
  });
});

// 登入API
login.post('/login', function (req, res) {
  var email = req.body.email;
  var password = req.body.password;


  // userinfo資料表
  var sql1 = 'SELECT * FROM userinfo WHERE email=?';
  // employeeinfo資料表
  var sql2 = 'SELECT * FROM employeeinfo WHERE employeeemail=?';
  
  //判斷會員帳號是否存在
  db.exec(sql1, email, function (results1, fields1) {
    if (results1 && results1[0]?.email === email) {
      if (results1[0].blacklist == 0)
        checkAccount(sql1, email, res) //跑會員表 
    } else {
       checkAccount(sql2, email, res) //跑員工表
    }
  });

  
  // 帳號密碼確認
  function checkAccount(sql, data, res) {
    db.exec(sql, data, function (results1, fields1) {
      if (results1 && results1[0]?.email === data && Decrypt(results1[0].password) === password) {
        req.session.username = "Member";
        req.session.user = results1;
        req.session.isLogin = true;
        res.send({ status: 0, msg: '登入成功', data: req.session.user });
      } else if (results1 && results1[0]?.employeeemail === data && password === Decrypt(results1[0].employeepw)) {
        req.session.username = "Employee";
        req.session.user = results1;
        req.session.isLogin = true;
        res.send({ status: 0, msg: '登入成功', data: req.session.user });
      } else {
        res.status(401).json({ message: '密碼不正確' });
      }
    })
  }
});


// 登出清空 session cookie用
login.get("/logout", (req, res) => {
  req.session.destroy(); // 清空 session 訊息
  res.clearCookie("connect.sid", { path: "/" });
  res.send({
    status: 0,
    msg: "登出成功",
  });
});

module.exports = login;
