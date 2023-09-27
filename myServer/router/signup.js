const express = require('express');
var db = require("../db");
var signup = express.Router();
// 加密解密
const Encrypted = require("../middleware/Encrypted")
const Decrypt = require("../middleware/Decrypt");
// 





// 會員資料表   
signup.get('/signup/userinfo', function (req, res) {
    var data = []
    var sql = `SELECT * FROM userinfo `
    db.exec(sql, data, function (result, failed) {
        res.send(result);
    })
})

// 註冊
// 
signup.post('/signup', function (req, res) {


    const { name, birthday, email, phone, id, rural, address, password } = req.body
    // 加密
    const encrypted = Encrypted(password);
    var sqllength = `SELECT COUNT(*) as count FROM userinfo;`


    db.exec(sqllength, [], function (result, failed) {
        const userid = `RA${String(result[0].count + 1).padStart(6, "0")}`;
        var sql = `INSERT INTO userinfo(name,birthday,phone,email,id,rural,address,admin,userid,password) 
        VALUES(?,?,?,?,?,?,?,?,?,?)`

        var admin = 0;


        // 加密的
        var data = [name, birthday, phone, email, id, rural, address, admin, userid, encrypted]

        // 未加密
        // var data = [name, birthday, phone, email, id, rural, address, admin, userid, password]

        db.exec(sql, data, function (results, fields) {
            if (!results) {
                res.send({ message: 'failed', data: results });
            } else {
                res.send({ message: 'success', data: results });
            }
        });

    })
});

module.exports = signup;