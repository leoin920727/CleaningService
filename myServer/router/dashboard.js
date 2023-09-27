const express = require("express");
const db = require("../db");
const dashboard = express.Router();
const upload = require("../middleware/multer");
const orderImg = require("../middleware/multer_order");
const Encrypted = require("../middleware/Encrypted");
const Decrypt = require("../middleware/Decrypt");

//新增打掃時間
dashboard.post("/member/orderdonetime", function (req, res) {
  const ornumber = req.body.ornumber;
  const sql1 = `SELECT * FROM attendance WHERE ornumber = ? AND mode = 1 `;
  const sql2 = `SELECT * FROM attendance WHERE ornumber = ?`;
  const data1 = [ornumber];
  db.exec(sql1, data1, function (results1, fields) {
    db.exec(sql2, data1, function (results2, fields) {
      res.send({ time: results2, data: results1, message: "success" });
    });
  });
});

// 員工驗證
dashboard.get("/employeeAdmin", function (req, res) {
  if (req.session?.user[0]?.admin === 2)
    return res.send({ isAuthorised: true });
  res.send({ isAuthorised: false });
});
// 管理者驗證
dashboard.get("/staffAdmin", function (req, res) {
  if (req.session) return res.send({ isAuthorised: true });
  res.send({ isAuthorised: false });
});
// 會員驗證
dashboard.get("/memberAdmin", function (req, res) {
  if (req.session?.user[0]?.admin === 0)
    return res.send({ isAuthorised: true });
  res.send({ isAuthorised: false });
});

// 後台訂單資料
dashboard.get("/orderlist", function (req, res) {
  const sql = `SELECT UO.ornumber,UO.employeeid,UO.weeks,UO.donetime,OL.money,OL.state,OL.ordertime 
  FROM userorder AS UO 
  INNER JOIN orderlist AS OL ON OL.ornumber=UO.ornumber;`;
  const data = [];
  db.exec(sql, data, function (result, fields) {
    res.send(result);
  });
});

// 後台訂單資料(詳細)
dashboard.get("/AdminOrder/:ornumber", function (req, res) {
  const ornumber = req.params.ornumber;
  const data = [ornumber];
  const sql = `SELECT *
  FROM orderlist AS OL
  INNER JOIN userorder AS UO ON OL.ornumber=UO.ornumber
  INNER JOIN employeeinfo AS EI ON UO.employeeid=EI.employeeid
  WHERE OL.ornumber=?`;
  db.exec(sql, data, function (result, fields) {
    res.send(result);
  });
});
// 後台訂單資料(更新)無用
// dashboard.put("/AdminOrder/updata/:ornumber", function (req, res) {
//   const ornumber = req.params.ornumber;
//   const { donetime, state ,orderdone} = req.body.data;
//   const data1 = [donetime, ornumber];
//   const data2 = [orderdone,state, ornumber];
//   const sql1 = `UPDATE userorder SET donetime=? WHERE ornumber=?`;
//   const sql2 = `UPDATE orderlist SET orderdone=? , state=? WHERE ornumber=?`;
//   db.exec(sql1, data1, function (result, fields) {
//     db.exec(sql2, data2, function (result, fields) {
//       res.send({ data: result, message: "success" });
//     });
//   });
// });

// 會員資料表
dashboard.get("/dashboard/memberInfo", function (req, res) {
  const sql = `SELECT * FROM userinfo`;
  const data = [];
  db.exec(sql, data, function (results, fields) {
    res.send(results);
  });
});

// 會員資料內容
dashboard.get("/dashboard/PersonalInfo/:userid", function (req, res) {
  const userid = req.params.userid;
  const sql1 = `SELECT userid FROM userinfo`;
  const sql2 = `SELECT * FROM userinfo WHERE userid =?`;
  const sql3 = `SELECT(whyblacklist) AS why FROM userinfo, blacklist WHERE userinfo.userid = blacklist.userid AND userinfo.userid =? `;
  const sql4 = `SELECT * FROM adreessdist`;
  const data = [userid];
  db.exec(sql1, [], function (number, fields) {
    db.exec(sql2, data, function (results, fields) {
      db.exec(sql3, data, function (why, fields) {
        db.exec(sql4, data, function (address, fields) {
          const ban = why.length === 0 ? " " : why;
          const len = number;
          res.send({ data: results, len: len, why: ban, address: address });
        });
      });
    });
  });
});

// 新增黑名單
dashboard.put("/dashboard/PersonalInfo/blacklist/:userid", function (req, res) {
  const userid = req.params.userid;
  const why = req.body.why;
  const sql1 = `UPDATE userinfo SET blacklist = 1 WHERE userinfo.userid = ? `;
  const sql2 = `INSERT INTO blacklist(userid, whyblacklist) VALUES(?,?)`;
  const data1 = [userid];
  const data2 = [userid, why];
  db.exec(sql1, data1, function (results2, fields) {
    db.exec(sql2, data2, function (results, fields) {
      res.send({ message: "success" });
    });
  });
});

// 更新黑名單
dashboard.put(
  "/dashboard/PersonalInfo/removeblacklist/:userid",
  function (req, res) {
    const userid = req.params.userid;
    const sql = `UPDATE userinfo SET blacklist = 0 WHERE userinfo.userid =? `;
    const data = [userid];
    db.exec(sql, data, function (results, fields) {
      res.send({ message: "success" });
    });
  }
);

// 刪除黑名單
dashboard.delete(
  "/dashboard/PersonalInfo/removeblacklist/:userid",
  function (req, res) {
    const userid = req.params.userid;
    const sql = `DELETE FROM blacklist WHERE blacklist.userid =? `;
    const data = [userid];
    db.exec(sql, data, function (results, fields) {
      res.send({ message: "success" });
    });
  }
);

// 員工資料表
dashboard.get("/dashboard/StaffList", function (req, res) {
  const sql = `SELECT * FROM employeeinfo`;
  const data = [];
  db.exec(sql, data, function (results, fields) {
    res.send(results);
  });
});

// 員工資料內容
dashboard.get("/dashboard/StaffList/:employeeid", function (req, res) {
  const employeeid = req.params.employeeid;
  const sql1 = `SELECT * FROM employeeinfo WHERE employeeid = ? `;
  const sql2 = `SELECT employeeid FROM employeeinfo ORDER BY employeeinfo.employeeid ASC`;
  const sql3 = `SELECT * FROM employeeinfo 
    INNER JOIN evaluate ON employeeinfo.employeeid = evaluate.employeeid 
    INNER JOIN orderlist ON evaluate.ornumber = orderlist.ornumber 
    WHERE employeeinfo.employeeid = ?; `;
  const sql4 = `SELECT * FROM adreessdist`;
  const data = [employeeid];
  db.exec(sql1, data, function (results, fields) {
    db.exec(sql2, data, function (useridarr, fields) {
      db.exec(sql3, data, function (list, fields) {
        db.exec(sql4, data, function (address, fields) {
          res.send({
            data: results,
            useridarr: useridarr,
            list: list,
            address: address,
          });
        });
      });
    });
  });
});

// 黑名單
dashboard.get("/dashboard/blacklist", function (req, res) {
  const sql = `SELECT * FROM userinfo, blacklist WHERE userinfo.userid = blacklist.userid; `;
  const data = [];
  db.exec(sql, data, function (results, fields) {
    res.send(results);
  });
});

// 更新會員資料
dashboard.put("/dashboard/PersonalInfo/update/:userid", function (req, res) {
  const userid = req.params.userid;
  const {
    upName,
    upId,
    upPhone,
    upRural,
    upAddress,
    upEmail,
    upAdmin,
    upBirthDay,
  } = req.body;
  const newPW = req.body.upPassWord;
  const sql = `UPDATE userinfo 
  SET name =?, birthday =?, phone =?, email =?, id =?, rural =?, address =?, admin =?
  WHERE userid =? `;
  const sql2 = `UPDATE userinfo SET password =? WHERE userid =? `;

  const data = [
    upName,
    upBirthDay,
    upPhone,
    upEmail,
    upId,
    upRural,
    upAddress,
    upAdmin,
    userid,
  ];

  db.exec(sql, data, function (results, fields) {
    if (newPW) {
      db.exec(sql2, [Encrypted(newPW), userid], function (results, fields) {});
    }
    res.send({ message: "success", data: results });
  });
});

// 刪除會員資料
dashboard.delete("/dashboard/PersonalInfo/delete/:userid", function (req, res) {
  const userid = req.params.userid;

  const sql = `
  DELETE userinfo, blacklist
  FROM userinfo
  LEFT JOIN blacklist ON userinfo.userid = blacklist.userid
  WHERE userinfo.userid = ?;
`;

  db.exec(sql, [userid], (error, results) => {
    if (error) {
      console.error("Error deleting data:", error);
      res.status(500).json({ error: "Error deleting data" });
      return;
    }

    res.status(200).json({ message: "Data deleted successfully" });
  });
});

// 地區資料
dashboard.get("/dashboard/addstaff", function (req, res) {
  const sql = `SELECT * FROM adreessdist`;
  const data = [];
  db.exec(sql, data, function (results, fields) {
    res.send(results);
  });
});

// 員工註冊資料+圖片
dashboard.post(
  "/dashboard/addstaff/upload",
  upload.single("photo"),
  function (req, res) {
    const {
      empLength,
      employeeName,
      employeePhone,
      employeeMail,
      employeePW,
      employeeIdNumber,
      employeeBirthDay,
      empRural,
      empAddress,
      vaccine,
      goodId,
      racheck,
    } = JSON.parse(req.body.data);

    const filePath = req.file.destination.slice(27) + req.file.filename;
    const encrypted = Encrypted(employeePW); //正式上線再開
    // const encrypted = employeePW;
    const employeeId = `RA${String(empLength + 1).padStart(3, "0")}`;

    const sql = `INSERT INTO employeeinfo
   (employeeid,employeename,employeephone,employeeemail,employeepw,employeeidnumber,employeebirthday,
    emprural,empaddress,photo,vaccine,goodid,racheck)  
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    const data = [
      employeeId,
      employeeName,
      employeePhone,
      employeeMail,
      encrypted,
      employeeIdNumber,
      employeeBirthDay,
      empRural,
      empAddress,
      filePath,
      vaccine,
      goodId,
      racheck,
    ];

    db.exec(sql, data, function (results, fields) {
      if (!results) {
        res.send({ message: "failed", data: results });
      } else {
        res.send({ message: "success", data: results });
      }
    });
  }
);

// 更新員工資料
dashboard.put("/dashboard/StaffList/update/:employeeid", function (req, res) {
  const employeeid = req.params.employeeid;

  const {
    upName,
    upPhone,
    upEmail,
    upVaccine,
    upGoodid,
    upRacheck,
    upIdnumber,
    upBirthday,
    upRural,
    upAddress,
  } = req.body;
  const newPassWord = req.body.upPassWord;
  const sql1 = `UPDATE employeeinfo
  SET employeename=?, employeephone=?, employeeemail=?, vaccine=?, goodid=?,
  racheck=?, employeeidnumber=?, employeebirthday=?, emprural=?, empaddress=?
  WHERE employeeid=?`;
  const sql2 = `UPDATE employeeinfo SET employeepw=? WHERE employeeid=?`;

  const data1 = [
    upName,
    upPhone,
    upEmail,
    upVaccine,
    upGoodid,
    upRacheck,
    upIdnumber,
    upBirthday,
    upRural,
    upAddress,
    employeeid,
  ];

  db.exec(sql1, data1, function (results, fields) {
    if (newPassWord) {
      const data2 = [Encrypted(newPassWord), employeeid];
      db.exec(sql2, data2, function (results, fields) {});
    }
    res.send({ message: "success", data: results });
  });
});

// 刪除員工資料
dashboard.delete(
  "/dashboard/StaffList/delete/:employeeid",
  function (req, res) {
    const employeeid = req.params.employeeid;

    const sql = "DELETE FROM employeeinfo WHERE employeeid = ?";

    db.exec(sql, [employeeid], (error, results) => {
      if (error) {
        console.error("Error deleting data:", error);
        res.status(500).json({ error: "Error deleting data" });
        return;
      }

      res.status(200).json({ message: "Data deleted successfully" });
    });
  }
);

// 會員專區資料
dashboard.get("/member/memberinfo/", function (req, res) {
  const userid = req.session?.user[0]?.userid;
  const sql1 = `SELECT * FROM userinfo`;
  const sql2 = `SELECT * FROM userinfo WHERE userid =?`;
  const sql3 = `SELECT * FROM adreessdist`;
  const data = [userid];
  db.exec(sql1, [], function (number, fields) {
    db.exec(sql2, data, function (results, fields) {
      db.exec(sql3, data, function (address, fields) {
        const len = number.length;
        res.send({ data: results, length: len, address: address });
      });
    });
  });
});

// 會員專區修改個人資料
dashboard.post("/member/memberinfo/update/", function (req, res) {
  const userid = req.session.user[0].userid;
  const { phone, rural, address } = req.body;
  const sql = `UPDATE userinfo
 SET phone =?, rural =?, address =? WHERE userid =? `;

  const data = [phone, rural, address, userid];
  db.exec(sql, data, function (results, fields) {
    res.send({ message: "success", data: results });
  });
});

// // 會員專區取得密碼
// dashboard.get("/member/changepwd/", function (req, res) {
//   const userid = req.session?.user[0]?.userid;
//   const sql = `SELECT password FROM userinfo WHERE userid =? `;
//   const data = [userid];
//   db.exec(sql, data, function (results, fields1) {
//     if (results.length > 0) {
//       const encryptedPassword = results[0].password;
//       const decryptedPassword = Decrypt(encryptedPassword);
//       res.send({ password: decryptedPassword });
//     }
//     else {
//       res.status(404).send({ error: "User not found" });
//     }
//   })
// });

// 會員專區修改密碼
dashboard.post("/member/changepwd/update/", function (req, res) {
  const userid = req.session.user[0].userid;
  const { uppassword } = req.body;
  console.log(
    "Received request to update password. UserID:",
    userid,
    "New Password:",
    uppassword
  );

  const sql = `UPDATE userinfo
   SET password =? WHERE userid =? `;

  const data = [Encrypted(uppassword), userid];

  db.exec(sql, data, function (results, fields) {
    if (!results) {
      res.send({ message: "failed", data: results });
    } else {
      res.send({ message: "success", data: results });
    }
  });
});

// 會員訂單資料表
dashboard.get("/member", function (req, res) {
  const userid = req.session?.user[0]?.userid;
  const sql = `SELECT UO.ornumber, UO.employeeid, UO.weeks, UO.donetime, OL.money, OL.state, OL.ordertime
  FROM userorder AS UO
  INNER JOIN orderlist AS OL ON OL.ornumber = UO.ornumber
  WHERE OL.userid = ?; `;
  const data = [userid];
  db.exec(sql, data, function (results, fields) {
    res.send(results);
  });
});

// 會員訂單內容
dashboard.get("/member/:orderNumber", function (req, res) {
  // const userid = req.session.user[0].userid; //會員編號
  const orderNumber = req.params.orderNumber; //訂單編號

  const sql1 = `SELECT * FROM userorder 
  INNER JOIN orderlist ON  userorder.ornumber = orderlist.ornumber
  WHERE orderlist.ornumber= ?`;
  const sql2 = `SELECT * FROM employeeinfo WHERE employeeid=?`;
  const sql3 = `SELECT 
  AVG(efficiency) AS efficiency,
  AVG(clean) AS clean,
  AVG(careful) AS careful,
  AVG(manner) AS manner
  FROM evaluate GROUP by ?`;
  const sql4 = `SELECT * FROM evaluate WHERE employeeid=? AND ornumber=?`;
  const data1 = [orderNumber];
  db.exec(sql1, data1, function (results1, fields) {
    const data2 = [results1[0]?.employeeid];
    db.exec(sql2, data2, function (results2, fields) {
      db.exec(sql3, data2, function (results3, fields) {
        db.exec(sql4, [data2, orderNumber], function (results4, fields) {
          res.send({
            results1: results1,
            results2: results2,
            results3: results3,
            results4: results4,
          });
        });
      });
    });
  });
});

// 訂單評價更新
dashboard.put("/member/updata/:orderNumber", function (req, res) {
  const orderNumber = req.params.orderNumber;
  const values = JSON.parse(JSON.stringify(req.body.data));
  const reply = req.body.comment;
  const { employeeid, state } = req.body.orderAPI;
  const [clean, efficiency, manner, careful] = [
    values[0].value,
    values[1].value,
    values[2].value,
    values[3].value,
  ];
  const data = [
    clean,
    efficiency,
    manner,
    careful,
    orderNumber,
    employeeid,
    state,
    reply,
  ];
  const sql = `INSERT INTO 
  evaluate (clean,efficiency,manner,careful,ornumber, employeeid,state,reply) 
  VALUES (?,?,?,?,?,?,?,?)`;
  db.exec(sql, data, function (results1, fields) {
    res.send({ message: "success", data: results1 });
  });
});

// 員工訂單
dashboard.get("/employeelist", function (req, res) {
  const sql = `SELECT UO.ornumber, UO.employeeid, UO.weeks, UO.donetime, OL.money, OL.state, OL.ordertime 
  FROM userorder AS UO 
  INNER JOIN orderlist AS OL ON OL.ornumber = UO.ornumber
  WHERE UO.employeeid = ?;`;
  const employeeid = req.session?.user[0]?.employeeid;
  const data = [employeeid];
  db.exec(sql, data, function (result, fields) {
    res.send(result);
  });
});

// 員工專區資料
dashboard.get("/employeelist/employeeinfo/", function (req, res) {
  const employeeid = req.session?.user[0]?.employeeid;
  const sql1 = `SELECT * FROM employeeinfo`;
  const sql2 = `SELECT * FROM employeeinfo WHERE employeeid =?`;
  const sql3 = `SELECT * FROM adreessdist`;
  const data = [employeeid];
  db.exec(sql1, [], function (number, fields) {
    db.exec(sql2, data, function (results, fields) {
      db.exec(sql3, data, function (address, fields) {
        const len = number.length;
        res.send({ data: results, length: len, address: address });
      });
    });
  });
});

// 員工專區修改個人資料
dashboard.post("/employeelist/employeeinfo/update/", function (req, res) {
  const employeeid = req.session.user[0].employeeid;
  const { employeephone, emprural, empaddress } = req.body;
  const sql = `UPDATE employeeinfo
 SET employeephone =?, emprural =?, empaddress =? WHERE employeeid =? `;

  const data = [employeephone, emprural, empaddress, employeeid];
  db.exec(sql, data, function (results, fields) {
    res.send({ message: "success", data: results });
  });
});

// 員工專區修改密碼
dashboard.post("/employeelist/employeepwd/update/", function (req, res) {
  const employeeid = req.session.user[0].employeeid;
  const { uppassword } = req.body;
  console.log(
    "Received request to update password. EmployeeID:",
    employeeid,
    "New Password:",
    uppassword
  );

  const sql = `UPDATE employeeinfo
   SET employeepw =? WHERE employeeid =? `;

  const data = [Encrypted(uppassword), employeeid];

  db.exec(sql, data, function (results, fields) {
    if (!results) {
      res.send({ message: "failed", data: results });
    } else {
      res.send({ message: "success", data: results });
    }
  });
});

//接收打掃圖片
dashboard.put(
  "/updata/orderdoneimages",
  orderImg.array("photo", 8),
  function (req, res) {
    const { weeks, ornumber, date, donetime, employeeid } = JSON.parse(
      req.body.data
    );
    const filePath = req.files
      .map((file) => {
        return `${file.destination.slice(27)}${file.filename}`;
      })
      .join(",");
    const sql1 = `UPDATE userorder SET donetime = ? WHERE  employeeid=? AND ornumber= ?`;
    const sql2 = `UPDATE attendance 
  SET mode =?, donetime =NOW(),orderphoto=?
  WHERE mode = 0 AND ornumber = ? AND employeeid=?
  ORDER BY oruid ASC 
  LIMIT 1;`;
    const sql3 = `UPDATE orderlist SET state= 1 WHERE ornumber=?`;
    const sql4 = `UPDATE orderlist SET state= ?,orderdone =NOW() WHERE ornumber=?`;
    const data1 = [donetime + 1, employeeid, ornumber];
    const data2 = [1, filePath, ornumber, employeeid];
    const data3 = [ornumber];
    const data4 = [2, ornumber];
    db.exec(sql1, data1, function (result1, fields) {
      db.exec(sql2, data2, function (result2, fields) {
        if (donetime === 0) {
          db.exec(sql3, data3, function (result3, fields) {
            res.send({ result1: result1, result2: result2, result3: result3 });
          });
        } else {
          if (weeks === donetime + 1) {
            db.exec(sql4, data4, function (result4, fields) {
              res.send({
                result1: result1,
                result2: result2,
                result4: result4,
              });
            });
          }
        }
      });
    });
  }
);

module.exports = dashboard;
