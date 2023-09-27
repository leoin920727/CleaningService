let express = require("express");
const bookRouter = express.Router();
const utils = require("../utils/book");
const utils2 = require("../utils/book2");
const Encrypted = require("../middleware/Encrypted");
const verifyCode = {}; // for register validation
const resetPwVerifyCode = {}; // for forgetting password
// -------- DB --------
let mysql = require("mysql");
const { json } = require("body-parser");
let myDBconn = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "root",
  database: "cleaning_services",
  multipleStatements: true,
});
myDBconn.connect(function (err) {
  if (err) {
    console.log("Book DB有錯");
    console.log(err);
  } else {
    console.log("Book DB OK");
  }
});

function queryPromise(sql, params) {
  return new Promise((resolve, reject) => {
    myDBconn.query(sql, params, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

bookRouter.post("/send-vericode", async (req, res) => {
  // req.body
  const { userMail } = req.body;
  let sql = `SELECT COUNT(*) FROM userinfo WHERE email = ?`;
  if (userMail) {
    let result = await queryPromise(sql, [userMail]);

    if (result[0]["COUNT(*)"]) {
      return res.status(400).json({ msg: "Email has been used" });
    }
  } else {
    return res.status(400).json({ msg: "no Email" });
  }

  // random code
  let randomCode = "";
  for (let i = 0; i < 6; i++) {
    randomCode += Math.floor(Math.random() * 10).toString();
  }
  verifyCode[userMail] = randomCode;
  params = {
    receiver: userMail,
    title: "浣熊管家 信箱驗證碼",
    content: `<h5>您的驗證碼:<b> ${randomCode} </b> </h5>
      <p>請於註冊介面驗證碼欄位輸入，該驗證碼將於5分鐘後失效!</p>
    `,
  };
  try {
    utils2.sendListMail(params); // code mail title -> obj
    setTimeout(() => {
      verifyCode[userMail] = null;
    }, 300000);
    return res.json({ msg: "send mail successfully!" });
  } catch {
    return res.status(500).json("msg", "something wrong");
  }
});

bookRouter.post("/verify-code", (req, res) => {
  const { code, userMail } = req.body;
  if (verifyCode[userMail] === code) {
    return res.json({ msg: "verify successfully" });
  } else {
    return res
      .status(401)
      .json({ msg: "validation code was wrong or expired" });
  }
});

// send verify mail for forgetting password
bookRouter.post("/forget-password", async (req, res) => {
  // req.body
  const { userMail } = req.body;
  let sql = `SELECT COUNT(*) FROM userinfo WHERE email = ?`;
  if (userMail) {
    let result = await queryPromise(sql, [userMail]);
    if (!result[0]["COUNT(*)"]) {
      return res.status(404).json({ msg: "Email not found!" });
    }
  } else {
    return res.status(400).json({ msg: "no email" });
  }
  // random code
  let randomCode = Math.random().toString(36).slice(-10);
  resetPwVerifyCode[randomCode] = userMail;
  params = {
    receiver: userMail,
    title: "浣熊管家 密碼重設",
    content: `<h5>請點選連結進行重設密碼: <a href="http://localhost:3000/renewpwd?code=${randomCode}">Click Me!</a> </h5>
      <p>該連結將於5分鐘後失效!</p>
    `,
  };
  try {
    utils2.sendListMail(params); // code mail title -> obj
    setTimeout(() => {
      resetPwVerifyCode[randomCode] = null;
    }, 300000);
    return res.json({ msg: "send mail successfully!" });
  } catch {
    return res.status(500).json({ msg: "something wrong" });
  }
});

// change password
bookRouter.post("/change-password", async (req, res) => {
  const { validationCode, newPwd } = req.body;
  // get the user mail from validation code
  let userMail = resetPwVerifyCode[validationCode];
  if (userMail) {
    const sqlStr = `UPDATE userinfo SET password =? WHERE email =? `;
    try {
      await queryPromise(sqlStr, [Encrypted(newPwd), userMail]);
      return res.json({ msg: "change successfully" });
    } catch {
      return res.status(500).json({ msg: "something wrang!" });
    }
  } else {
    return res
      .status(401)
      .json({ msg: "Unauthorize or validation code expire!" });
  }
});

// -------- API --------
// login check
bookRouter.use((req, res, next) => {
  if (!req.session.isLogin) {
    return res.status(403).send({ status: 1, msg: "無權進行此操作" });
  }
  next();
});

bookRouter.get("/price", (req, res) => {
  const week = req.query.week;
  myDBconn.query(
    `SELECT \`price\` FROM \`priceList\` WHERE weekNumber = ?;`,
    [week],
    (err, data) => {
      if (err) {
        console.log(err);
      }
      return res.json(data);
    }
  );
});
bookRouter.get("/dist", (req, res) => {
  const distId = req.query.dist;
  myDBconn.query(`SELECT * FROM adreessdist;`, [distId], (err, data) => {
    if (err) {
      console.log(err);
    }
    return res.json(data);
  });
});
// 服務人員
bookRouter.get("/employee-info", (req, res) => {
  let data1;
  let sql = `
    SELECT
        info.employeename,
        info.photo,
        IFNULL(ROUND((score.e1 + score.e2 + score.e3 + score.e4) / 4, 1), 0) AS total_efficiency
    FROM
        employeeinfo AS info
    LEFT JOIN
        (
            SELECT
                p.employeeid,
                AVG(v.efficiency) AS e1,
                AVG(v.clean) AS e2,
                AVG(v.careful) AS e3,
                AVG(v.manner) AS e4
            FROM
                employeeinfo AS p
            LEFT JOIN
                evaluate AS v ON p.employeeid = v.employeeid
            GROUP BY
                p.employeeid
        ) AS score
    ON
        score.employeeid = info.employeeid;`;
  myDBconn.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
    }
    data1 = rows.map((result) => {
      result.total_efficiency = result.total_efficiency.toFixed(1);
      return result;
    });
    return res.json(data1);
  });
});

// 預約時間相關
bookRouter.get("/free-time", (req, res) => {
  let sqlStr;
  const { employeeid, weekDay, timespan } = req.query;

  if (!employeeid || employeeid == "null") {
    sqlStr = `
      SELECT A.time, A.date FROM 
        (SELECT \`time\`, \`date\`, COUNT(*) AS record_count
        FROM attendance
        WHERE \`date\` >= DATE_ADD(CURDATE(), INTERVAL 1 day) AND \`date\` < DATE_ADD(CURDATE(), INTERVAL 3 MONTH) 
        GROUP BY \`time\`, \`date\`
        ORDER BY \`date\`) AS A
      WHERE A.record_count >= (SELECT COUNT(*) FROM employeeinfo);
    `;
  } else {
    sqlStr = `
      SELECT A.time, A.date FROM 
      (SELECT \`time\`, \`date\`
      FROM attendance
      WHERE \`date\` >= DATE_ADD(CURDATE(), INTERVAL 1 day) AND \`date\` < DATE_ADD(CURDATE(), INTERVAL 3 MONTH) 
      AND employeeid = ?
      ORDER BY \`date\`) AS A
    `;
  }
  myDBconn.query(sqlStr, [employeeid], (err, rows) => {
    if (err) {
      console.log(err);
      return res.json([]);
    }
    let notWorkDays = rows;
    notWorkDays.forEach((element) => {
      element.date.setHours(element.date.getHours() + 8);
    });
    const freeDays = utils.updateFreeDays(notWorkDays);

    if (weekDay == "null" || !weekDay) {
      return res.json(utils.getFreeDays(freeDays));
    } else {
      if (timespan == "null" || !timespan) {
        return res.json(utils.getFreeTime(freeDays, weekDay));
      } else {
        return res.json(utils.getFreeDate(freeDays, weekDay, timespan));
      }
    }
  });
});

// uid取得會員資料
bookRouter.get("/member-info/:uid", (req, res) => {
  const { uid } = req.params;
  let sqlStr = `
    SELECT * FROM userinfo WHERE uid = ?;
  `;
  myDBconn.query(sqlStr, [uid], (err, rows) => {
    return res.json(rows);
  });
});

// 新增訂單至資料庫
bookRouter.post("/new-order", async (req, res) => {
  try {
    let {
      uid,
      employeeid,
      date,
      time,
      weeks,
      phone,
      email,
      city,
      rural,
      address,
      name,
      note,
    } = req.body;
    const orderId = utils.getRandomOrderId();
    let price;
    let sqlStr;

    // attendance
    // 若無指派人，先看誰工作時數最少，再找當天誰有空
    if (employeeid === "null") {
      sqlStr = `
      SELECT i.employeeid, IFNULL(b.worktime, 0) AS worktime
      FROM employeeinfo AS i
      LEFT JOIN (
          SELECT employeeid, COUNT(*) AS worktime
          FROM attendance
          GROUP BY employeeid
      ) AS b ON i.employeeid = b.employeeid
      WHERE i.employeeid NOT IN (
          SELECT employeeid
          FROM attendance 
          WHERE \`time\` = ? AND \`date\` = ?
      )
      ORDER BY IFNULL(b.worktime, 0)  LIMIT 1;`;
      employeeid = (await queryPromise(sqlStr, [time, date]))[0].employeeid;
      if (!employeeid) {
        return res.json("have no employee to work");
      }
    }

    // add attendance data
    for (let i = 0; i < weeks; i++) {
      sqlStr = `INSERT INTO attendance (employeeid, mode, time, date, ornumber) VALUES (?, ?, ?, DATE_ADD(?, INTERVAL ? DAY),?)`;
      await queryPromise(sqlStr, [employeeid, 0, time, date, i * 7, orderId]);
    }

    // update employee cases count
    sqlStr = `UPDATE employeeinfo SET cases = cases + 1 WHERE employeeid = ?`;
    await queryPromise(sqlStr, [employeeid]);

    // userorder
    sqlStr = `
      INSERT INTO userorder (ornumber, employeeid, date, time, weeks, donetime)
      VALUES (?, ?, ?, ?, ?, ?);
    `;
    await queryPromise(sqlStr, [orderId, employeeid, date, time, weeks, 0]);

    // orderlist
    sqlStr = `
      SELECT price FROM priceList WHERE weekNumber = ?;
    `;
    price = (await queryPromise(sqlStr, [weeks]))[0].price;
    sqlStr = `
      INSERT INTO orderlist (ornumber, orphone, oremail, orcity, orrural, oraddress, userid, orname, money, pay, state, note)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    await queryPromise(sqlStr, [
      orderId,
      phone,
      email,
      city,
      rural,
      address,
      uid,
      name,
      price,
      "1",
      0,
      note,
    ]);

    // email
    let mailObj = {};
    const bookWeeks = [
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六",
    ];
    const bookTime = ["08:00", "13:00", "18:00"];
    const bookDay = new Date(date).getDay();
    sqlStr = `SELECT email FROM \`userinfo\` WHERE userid = ?;`;
    mailObj.receiver = (await queryPromise(sqlStr, [uid]))[0].email;
    sqlStr = `SELECT \`date\` FROM \`attendance\` WHERE ornumber = ?;`;
    const bookDates = await queryPromise(sqlStr, [orderId]);
    sqlStr = `SELECT \`employeename\` FROM \`employeeinfo\` WHERE employeeid = ?;`;
    mailObj.employeeName = (
      await queryPromise(sqlStr, [employeeid])
    )[0].employeename;
    mailObj.title = "浣熊管家定期清掃訂單明細";
    let bookDateStr = "";
    bookDates.forEach(
      (ele) => (bookDateStr += utils.toDateString(ele.date) + ", ")
    );
    bookDateStr = bookDateStr.slice(0, -2);
    mailObj.content = `
      <h2>${name}, 您好！</h2>
      <h3>感謝您的預約！</h3>
      <h4>您詳細預約的明細如下：</h4>
      <p>訂單編號：${orderId}</p>
      <p>訂單金額：${price}</p>
      <p>付款方式：信用卡一次付清</p>
      <p>打掃專員：${mailObj.employeeName}</p>
      <p>預約週數：${weeks} 週</p>
      <p>預約時段：${bookWeeks[bookDay]}  ${bookTime[time]}</p>
      <p>到府清掃日期：${bookDateStr}</p>
      <p>訂單備註：${note}</p>
    `;
    utils2.sendListMail(mailObj);
    return res.json(orderId);
  } catch (err) {
    res.json(err);
    console.log(err);
  }
});

module.exports = bookRouter;
