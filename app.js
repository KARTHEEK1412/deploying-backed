const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000; // Set your desired port

app.use(bodyParser.json());

// Dummy student data
let students = [
  { id: 1, name: "John", age: 20 },
  { id: 2, name: "Jane", age: 22 },
  { id: 3, name: "Bob", age: 19 },
];

// GET method to retrieve all students
app.get("/students", (req, res) => {
  res.json(students);
});

// POST method to add a new student
app.post("/students", (req, res) => {
  const { name, age } = req.body;
  if (name | age) {
    const newStudent = {
      id: students.length + 1,
      name,
      age,
    };
    students.push(newStudent);
    res.status(201).json(newStudent);
  } else {
    res.status(404).json({ error: "require name and age fields" });
  }
});

// DELETE method to remove a student by ID
app.delete("/students/:id", (req, res) => {
  const studentId = parseInt(req.params.id);
  const index = students.findIndex((student) => student.id === studentId);
  if (index !== -1) {
    students.splice(index, 1);
    res
      .status(204)
      .json({ status: `Student with ID ${req.params.id} deleted` });
  } else {
    res.status(404).json({ error: "Student not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
