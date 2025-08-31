const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors()); //allows frontend to fetch

const students = [
    { id: 1, name: "Bhuvan", age: 21 },
    { id: 2, name: "Aniket", age: 22 },
    { id: 3, name: "Dhanshri", age: 20 },
    { id: 4, name: "Vishakha", age: 21 },
    { id: 5, name: "Prantik", age: 22 },
    { id: 6, name: "Rishi", age: 22 },
    { id: 7, name: "Shweta", age: 20 },
    { id: 8, name: "Ujwala", age: 18 },
    { id: 9, name: "Khushi", age: 22 },
    { id: 10, name: "Kartik", age: 20 }
];

app.get("/students", (req, res) => {
    res.json(students);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/students`);
});
