let express = require("express");
const total = express.Router();
var db = require("../db");


total.get("/as", (req, res) => {
  db.exec(
    `SELECT 'employeeid' AS source, COUNT(*) AS count FROM employeeinfo UNION ALL SELECT 'reply' AS source, COUNT(*) AS count FROM evaluate UNION ALL SELECT 'ornumber' AS source, COUNT(*) AS count FROM evaluate;
  `,
    (err, data) => {
      if (err) {
        console.log("sql有錯");
        console.log(err);
      }
      return res.json(data);
    }
  );
});



total.get("/sta", (req, res) => {
  db.exec(
    `SELECT
    info.employeename,
    info.photo,
    info.vaccine,
    info.goodid,
    info.racheck,
    info.cases,
    info.employeeid,
    ROUND((score.e1 + score.e2 + score.e3 + score.e4) / 4, 1) AS total_efficiency,
    SUM(ev.efficiency + ev.clean + ev.careful + ev.manner) AS total_ratings
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
    score.employeeid = info.employeeid
LEFT JOIN
    (
        SELECT
            employeeid,
            efficiency,
            clean,
            careful,
            manner
        FROM
            evaluate
    ) AS ev
ON
    ev.employeeid = info.employeeid
GROUP BY
    info.employeename,
    info.photo,
    info.vaccine,
    info.goodid,
    info.racheck,
    info.cases,
    info.employeeid,
    total_efficiency;`,
    (err, data) => {
      if (err) {
        console.log("sql有錯");
        console.log(err);
      }
      return res.json(data);
    }
  );
});

total.get("/mar", (req, res) => {
  db.exec(
    `SELECT total.employeename, total.photo, total.total_efficiency,reply.reply
    FROM (
        SELECT new.employeeid,
               new.employeename,
          new.photo,
               ROUND((e1 + e2 + e3 + e4) / 4, 1) AS total_efficiency
        FROM (
            SELECT p.employeeid,
                   p.employeename,
                p.photo,
                   AVG(v.efficiency) AS e1,
                   AVG(v.clean) AS e2,
                   AVG(v.careful) AS e3,
                   AVG(v.manner) AS e4
            FROM employeeinfo AS p
            LEFT JOIN evaluate AS v ON p.employeeid = v.employeeid
            GROUP BY p.employeeid, p.employeename
        ) AS new
    ) AS total
    LEFT JOIN (
        SELECT e.employeeid, e.reply
        FROM evaluate AS e
        WHERE reply <> "" AND reply IS NOT NULL
    ) AS reply
    ON total.employeeid = reply.employeeid;
  `,
    (err, data) => {
      if (err) {
        console.log("sql有錯");
        console.log(err);
      }
      return res.json(data);
    }
  );
});

total.get("/modal", (req, res) => {
  db.exec(
    `SELECT 	
    new.employeename,
     new.photo,
      new.total_ratings,
      new.e1,
      new.e2,
      new.e3,
      new.e4,
      new.reply,
      new.ornumber ,
      new2.orname
      FROM
  (SELECT   
    t1.employeename,
      t1.photo,
      t1.total_ratings,
      t1.e1,
      t1.e2,
      t1.e3,
      t1.e4,
      t2.reply,
      t2.ornumber
      FROM
  (SELECT
     info.employeeid,
      info.employeename,
      info.photo,
      score.total_ratings,
      score.e1,
      score.e2,
      score.e3,
      score.e4
  FROM
      employeeinfo AS info
  LEFT JOIN
      (
          SELECT
              p.employeeid,
              AVG(v.efficiency) AS e1,
              AVG(v.clean) AS e2,
              AVG(v.careful) AS e3,
              AVG(v.manner) AS e4,
            SUM(v.efficiency + v.clean + v.careful + v.manner) AS total_ratings
          FROM
              employeeinfo AS p
          LEFT JOIN
              evaluate AS v ON p.employeeid = v.employeeid
          GROUP BY
              p.employeeid
      ) AS score
  ON
      score.employeeid = info.employeeid) AS t1 
      LEFT JOIN (SELECT employeeid, reply,ornumber FROM evaluate) AS t2
      ON t1.employeeid = t2.employeeid
     ) AS new LEFT JOIN (SELECT ornumber,orname FROM orderlist) AS new2 ON new.ornumber = new2.ornumber
      ORDER BY
    new.employeename ASC;
   ;
  `,
    (err, data) => {
      if (err) {
        console.log("sql有錯");
        console.log(err);
      }
      return res.json(data);
    }
  );
});


total.get("/stars", (req, res) => {
  db.exec(
    `SELECT e.employeeid,
    e.total_stars,
    v.ornumber
FROM (
 SELECT p.employeeid,
        ROUND((AVG(v.efficiency) + AVG(v.clean) + AVG(v.careful) + AVG(v.manner))/4, 1) AS total_stars
 FROM employeeinfo AS p
 LEFT JOIN evaluate AS v ON p.employeeid = v.employeeid
 GROUP BY p.employeeid
) AS e
INNER JOIN evaluate AS v ON e.employeeid = v.employeeid;
  `,
    (err, data) => {
      if (err) {
        console.log("sql有錯");
        console.log(err);
      }
      return res.json(data);
    }
  );
});


module.exports = total;