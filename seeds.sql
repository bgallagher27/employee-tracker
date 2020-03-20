INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Keanu", "Reeves", 0, 0), ("Lawrence", "Fishburne", 0, 0), ("Christian", "Bale", 0, 0);

INSERT INTO department (department_name)
VALUES ("sales"), ("production"), ("direction"), ("marketing");

INSERT INTO role (title, salary, department_id)
VALUES ("sales rep", 70000, 0), ("producer", 95000, 0), ("director", 85000, 0), ("marketing coordinator", 65000, 0);