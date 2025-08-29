import React, { useState } from "react";

function LiveTextPreview() {
  const [text, setText] = useState("");

  return (
    <div style={styles.box}>
      <h2>Live Text Preview</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
        style={styles.input}
      />
      <p>Preview: {text}</p>
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
  input: {
    padding: "8px",
    margin: "10px",
    width: "80%",
  },
};

export default LiveTextPreview;
