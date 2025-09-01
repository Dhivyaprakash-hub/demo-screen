// src/App.js
import React, { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Blood Pressure Monitor",
      price: 1999,
      description: "Clinically validated",
    },
    {
      id: 2,
      name: "Glucometer Kit",
      price: 1499,
      description: "Includes 25 test strips",
    },
  ]);

  // optional: live fetch commented out for now
  // useEffect(() => {
  //   fetch("/api/products").then(r => r.json()).then(setProducts);
  // }, []);

  return (
    <div
      style={{
        padding: 20,
        fontFamily: "Arial, sans-serif",
        maxWidth: 600,
        margin: "auto",
      }}
    >
      <h1 style={{ fontSize: 22 }}>Clinical Product Demo</h1>
      <p style={{ color: "#444" }}>
        Open this URL on your phone to view the UI.
      </p>
      <div style={{ marginTop: 12 }}>
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #eee",
              padding: 12,
              borderRadius: 8,
              marginBottom: 10,
            }}
          >
            <strong>{p.name}</strong>
            <div style={{ fontSize: 14, color: "#666" }}>{p.description}</div>
            <div style={{ marginTop: 8, fontWeight: "600" }}>₹{p.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
