const express = require("express");
const app = express();
const PORT = 3000;

// Sample students list
const students = [
    { id: 1, name: "Bhuvan", age: 21 },
    { id: 2, name: "Aniket", age: 22 },
    { id: 3, name: "Dhanshri", age: 20 }
];

// API endpoint
app.get("/students", (req, res) => {
    res.json(students);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/students`);
});
