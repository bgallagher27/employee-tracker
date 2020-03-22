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
  start();
});

// function which prompts the user for what action they should take
function start() {
    inquirer
      .prompt({
        name: "initialAction",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "Add a department",
            "Add a role",
            "Add an employee",
            "View employees, departments, & roles",
            "Update employee roles"
        ]
      })
      .then(function(answer) {
        // Call the respective functionality based on user answer
        if (answer.initialAction === "Add a department") {
            addDepartment();
        }
        else if(answer.initialAction === "Add a role") {
            addRole();
        }
        else if(answer.initialAction === "Add an employee") {
            addEmployee();
        }
        else if(answer.initialAction === "View employees, departments, & roles") {
            showEmployees();
        }
        else if(answer.initialAction === "Update employee roles") {
            updateEmployees();
        }
        else{
          connection.end();
        }
      });
  }
  

// Creating functions for each action option
function showEmployees() {
    let employeeTable = "SELECT employee.id, employee.first_name, employee.last_name, department.department_name, role.title, role.salary FROM employee LEFT OUTER JOIN department ON employee.id = department.id LEFT OUTER JOIN role ON employee.id = role.id";
    connection.query(employeeTable, function(err, res) {
        console.table(res);
    });
};

function addDepartment() {
    //
};

function addRole() {
    //
};

function addEmployee() {
    //
};

function updateEmployees() {
    //
};