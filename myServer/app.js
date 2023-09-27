var express = require("express");
var index = require("./router/index");
var dashboard = require("./router/dashboard");
var login = require("./router/login");
var signup = require("./router/signup");
const bodyParser = require("body-parser");
var cors = require("cors");
var app = express();

const session = require("express-session");
const cookieParser = require("cookie-parser");

app.use(
  session({
    secret: "raccoonncleaning",
    resave: false, // 固定寫法
    saveUninitialized: true, // 固定寫法

    cookie: {
      // 目前設定五分鐘
      secure: false,
      // 當httpOnly設定為false時會有安全問題 會使網頁可以使用JS存取cookie
      httpOnly: true,
      maxAge: 60 * 1000 * 60,
    },
  })
);

//----允許此網域可跨域存取
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
//--------------

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", dashboard);
app.use("/", index);
app.use("/", login);
app.use("/", signup);

app.listen(4107, function () {
  console.log("測試伺服器中:" + new Date().toLocaleTimeString());
});
