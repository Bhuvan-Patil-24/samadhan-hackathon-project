import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={styles.box}>
      <h2>Counter</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

const styles = {
  box: {
    border: "1px solid #ccc",
    padding: "16px",
    marginLeft: "450px",
    borderRadius: "8px",
    textAlign: "center",
  },
};

export default Counter;
