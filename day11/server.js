const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// In-memory "database"
let students = [
    { "id": 1, "name": "Alice", "age": 20, "course": "CS" }
];

// Start server
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000/students");
});

app.post("/students", (req, res) => {
    const student = {
        id: students.length + 1,
        name: req.body.name,
        age: req.body.age,
        course: req.body.course
    };
    students.push(student);
    res.status(201).json(student);
});

app.get("/students", (req, res) => {
    res.json(students);
});

app.get("/students/:id", (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) return res.status(404).send("Student not found");
    res.json(student);
});

app.put("/students/:id", (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) return res.status(404).send("Student not found");

    student.name = req.body.name || student.name;
    student.age = req.body.age || student.age;
    student.course = req.body.course || student.course;

    res.json(student);
});

app.delete("/students/:id", (req, res) => {
    const studentIndex = students.findIndex(s => s.id === parseInt(req.params.id));
    if (studentIndex === -1) return res.status(404).send("Student not found");

    const deletedStudent = students.splice(studentIndex, 1);
    res.json(deletedStudent);
});
