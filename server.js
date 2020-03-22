var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "redsox27",
  database: "employeeTracker_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  let initialTable = "SELECT employee.id, employee.first_name, employee.last_name, department.department_name, role.title, role.salary FROM employee LEFT OUTER JOIN department ON employee.id = department.id LEFT OUTER JOIN role ON employee.id = role.id";
  connection.query(initialTable, function(err, res) {
    console.table(res);
})});