var mysql = require("mysql");

exports.exec = (sql, data, callback) => {
  var myDBconn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "cleaning_services",
    multipleStatements: true,
  });
  myDBconn.connect();

  myDBconn.query(sql, data, function (error, results, fields) {
    if (error) {
      console.log(error);
    }
    callback(results, fields);
  });
  myDBconn.end();
};
