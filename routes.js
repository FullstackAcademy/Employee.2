const express = require("express");
const employees = require("./employees");
const router = express.Router();

router.get("/", (req, res) => {
    res.json(employees);
});

router.get("/random", (req, res) => { 
    const i = Math.floor(Math.random() * employees.length);
    res.json(employees[i]);

});

router.get("/:id", (req, res) => {
    const id = +req.params.id; 
    const employee = employees.find(emp => emp.id === id); 
    if (employee) {
        res.json(employee); // Send the employee as JSON
    } else {
      res.status(404).send(`There is no employee with id ${id}.`); // Send a 404 response if not found
    }
  });

router.post("/", (req, res) => {
    const { name } = req.body;

    if (!name || typeof name !== "string" || name.trim() === "") {
        return res.status(400).send("name is required girl...");
        }
        const newEmployee = {
            id: employees.length > 0 ? employees[employees.length - 1].id + 1 : 1,
            name: name.trim
        }
        employees.push(newEmployee);
        res.status(201).json(newEmployee);
    });

module.exports = router; 