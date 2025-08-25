const marks = [78, 92, 85, 69, 95, 88];

let highest = marks[0];

for (let i = 1; i < marks.length; i++) {
    if (marks[i] > highest) {
        highest = marks[i];
    }
}

console.log("Highest Marks:", highest);
