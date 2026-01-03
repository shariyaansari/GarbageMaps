import React, { useState } from "react";
import MumbraMap from "./components/MumbraMap";
import Sidebar from "./components/Sidebar";
import sectorsData from "./data/sectors.json";

function App() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      {/* Sidebar - Controlled by 'isOpen' */}
      <div
        style={{
          width: isOpen ? "320px" : "0px",
          height: "100%",
          overflow: "hidden",
          backgroundColor: "#f8fafc",
          borderRight: isOpen ? "1px solid #e2e8f0" : "none",
          transition: "width 0.3s ease-in-out", // Smooth opening/closing
        }}
      >
        <Sidebar sectors={sectorsData} />
      </div>

      {/* Main Map Area */}
      <main style={{ flex: 1, position: "relative", height: "100%" }}>
        {/* Toggle Button - Floats on the map */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            position: "absolute",
            top: "auto",
            bottom: "30px",
            left: "20px",
            zIndex: 1100, // Higher than map elements
            backgroundColor: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            padding: "10px 15px",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {isOpen ? "✕ Close Panel" : "☰ Open Analytics"}
        </button>
        <MumbraMap isOpen={isOpen} />
      </main>
    </div>
  );
}

export default App;
