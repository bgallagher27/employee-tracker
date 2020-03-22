const mysql = require("mysql");
const inquirer = require("inquirer");

// Creating MySQL connection
const connection = mysql.createConnection({
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
            "Add an employee",
            "Add a department",
            "Add a role",
            "View all employees",
            "View all departments",
            "View all roles",
            "View all employees, departments, & roles",
            "Update employee roles"
        ]
      })
      .then(function(answer) {
        // Call the respective functionality based on user answer
        if(answer.initialAction === "Add an employee") {
            addEmployee();
        }
        else if(answer.initialAction === "Add a department") {
            addDepartment();
        }
        else if(answer.initialAction === "Add a role") {
            addRole();
        }
        else if(answer.initialAction === "View all employees") {
            showEmployees();
        }
        else if(answer.initialAction === "View all departments") {
            showDepartments();
        }
        else if(answer.initialAction === "View all roles") {
            showRoles();
        }
        else if(answer.initialAction === "View all employees, departments, & roles") {
            showAll();
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
function addEmployee() {
    //
};

function addDepartment() {
    //
};

function addRole() {
    //
};


function showEmployees() {
    //
};

function showDepartments() {
    //
};

function showRoles() {
    //
};

function showAll() {
    let employeeTable = "SELECT employee.id, employee.first_name, employee.last_name, department.department_name, role.title, role.salary FROM employee LEFT OUTER JOIN department ON employee.id = department.id LEFT OUTER JOIN role ON employee.id = role.id";
    connection.query(employeeTable, function(err, res) {
        console.table(res);
    });
};

function updateEmployees() {
    //
};