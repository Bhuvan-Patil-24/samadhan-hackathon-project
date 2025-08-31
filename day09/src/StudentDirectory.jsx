import React, { useEffect, useState } from "react";

export default function StudentDirectory() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/students")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading students...</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Student Directory</h1>
      <div style={styles.grid}>
        {students.map((student) => (
          <div key={student.id} style={styles.card}>
            <h2 style={styles.name}>{student.name}</h2>
            <p>Age: {student.age}</p>
            <p>ID: {student.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "1450px",
    margin: "20px",
    padding: "20px",
    borderRadius: "10px",
    background: "#a6cdf3ff",
  },
  title: {
    textAlign: "center",
    color: "#081018ff",
    marginBottom: "30px",
    fontSize: "2rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    color: "black",
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    transition: "0.3s",
    textAlign: "center",
  },
  name: {
    marginBottom: "10px",
    color: "#1b2d3fff",
  },
};
