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
  console.log("WELCOME TO EMPLOYEE MANAGER!")
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
    inquirer.prompt([
        {
            name: "first-name",
            type: "input",
            message: "What is the employee's first name?"
        },
        {
            name: "last-name",
            type: "input",
            message: "What is the employee's last name?"
        },
        {
            name: "department",
            type: "input",
            message: "What department does the employee work in?"
        },
        {
            name: "title",
            type: "input",
            message: "What is the employee's title?"
        },
        {
            name: "salary",
            type: "input",
            message: "What is the employee's yearly salary?"
        }
    ])
    .then(function(answer) {
        connection.query(
            "INSERT INTO employee SET ?",
            {
              first_name: answer["first-name"],
              last_name: answer["last-name"],
            },
            function(err) {
              if (err) throw err;
            });
        connection.query(
            "INSERT INTO department SET ?",
            {
                department_name: answer["department"],
            },
            function(err) {
                if (err) throw err;
            });
        connection.query(
            "INSERT INTO role SET ?",
            {
                title: answer["title"],
                salary: answer["salary"],
            },
            function(err) {
                if (err) throw err;
                console.log("Your employee was created successfully!");
                start();
            });
    });
};

function addDepartment() {
    inquirer.prompt([
        {
            name: "new-department",
            type: "input",
            message: "What is the new department?"
        },
    ])
    .then(function(answer) {
        connection.query(
            "INSERT INTO department SET ?",
            {
              department_name: answer["new-department"],
            },
            function(err) {
                if (err) throw err;
                console.log("Your department was created successfully!");
                start();
            });
    });
};

function addRole() {
    inquirer.prompt([
        {
            name: "new-title",
            type: "input",
            message: "What is the employee's first name?"
        },
        {
            name: "new-salary",
            type: "input",
            message: "What is the employee's last name?"
        },
    ])
    .then(function(answer) {
        connection.query(
            "INSERT INTO role SET ?",
            {
                title: answer["new-title"],
                salary: answer["new-salary"],
            },
            function(err) {
                if (err) throw err;
                console.log("Your role was created successfully!");
                start();
            });
    });
};


function showEmployees() {
    let employeeTable = "SELECT employee.id, employee.first_name, employee.last_name FROM employee";
    connection.query(employeeTable, function(err, res) {
        console.table(res);
    });
};

function showDepartments() {
    let departmentTable = "SELECT * FROM department";
    connection.query(departmentTable, function(err, res) {
        console.table(res);
    });
};

function showRoles() {
    let roleTable = "SELECT role.id, role.title, role.salary FROM role";
    connection.query(roleTable, function(err, res) {
        console.table(res);
    });
};

function showAll() {
    let allTable = "SELECT employee.id, employee.first_name, employee.last_name, department.department_name, role.title, role.salary FROM employee LEFT OUTER JOIN department ON employee.id = department.id LEFT OUTER JOIN role ON employee.id = role.id";
    connection.query(allTable, function(err, res) {
        console.table(res);
    });
};

function updateEmployees() {
    //
};