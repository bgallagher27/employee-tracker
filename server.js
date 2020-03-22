var mysql = require("mysql");

// Creating MySQL connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "redsox27",
  database: "employeeTracker_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  console.log("Welcome to Employee Manager!")
});


// Creating functions for each action option
function showEmployees() {
    let employeeTable = "SELECT employee.id, employee.first_name, employee.last_name, department.department_name, role.title, role.salary FROM employee LEFT OUTER JOIN department ON employee.id = department.id LEFT OUTER JOIN role ON employee.id = role.id";
    connection.query(employeeTable, function(err, res) {
        console.table(res);
    });
};

function addEmployees() {
    //
};

function updateEmployees() {
    //
};