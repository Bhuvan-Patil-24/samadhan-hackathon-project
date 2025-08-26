const marks = [80, 75, 90, 85, 70];

const total = marks.reduce((sum, val) => sum + val, 0);
const average = marks.reduce((sum, val, _, arr) => sum + val / arr.length, 0);

let grade;
if (average >= 90) grade = "A+";
else if (average >= 75) grade = "A";
else if (average >= 60) grade = "B";
else grade = "C";

console.log("Marks:", marks);
console.log("Total Marks:", total);
console.log("Average:", average);
console.log("Grade:", grade);
