import React from "react";
import { calculateScore } from "../utils/mapLogic";
import { exportToCSV } from '../utils/exportData';

const Sidebar = ({ sectors }) => {
  const sortedSectors = [...sectors.features]
    .map((f) => ({
      name: f.properties.name,
      score: calculateScore(f.properties),
    }))
    .sort((a, b) => b.score - a.score);

  const topDirty = sortedSectors.slice(0, 3);
  const avgHealth = (
    10 -
    sortedSectors.reduce((acc, curr) => acc + curr.score, 0) /
      sortedSectors.length
  ).toFixed(1);

  return (
    <div
      style={{
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <div>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "900",
            margin: 0,
            color: "#1e293b",
          }}
        >
          Mumbra
        </h2>
        <p
          style={{
            fontSize: "12px",
            color: "#64748b",
            fontWeight: "bold",
            margin: 0,
          }}
        >
          Cleanliness Analytics
        </p>
      </div>

      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "16px",
          textAlign: "center",
          border: "1px solid #f1f5f9",
        }}
      >
        <p
          style={{
            fontSize: "10px",
            color: "#94a3b8",
            fontWeight: "bold",
            margin: "0 0 5px 0",
            textTransform: "uppercase",
          }}
        >
          City Health Index
        </p>
        <h3
          style={{
            fontSize: "32px",
            fontWeight: "900",
            color: "#16a34a",
            margin: 0,
          }}
        >
          {avgHealth}/10
        </h3>
      </div>

      <div>
        <h4
          style={{
            fontSize: "10px",
            color: "#ef4444",
            fontWeight: "900",
            margin: "0 0 15px 0",
            textTransform: "uppercase",
          }}
        >
          Critical Sectors
        </h4>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {topDirty.map((area, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "white",
                padding: "12px",
                borderRadius: "12px",
                borderLeft: "4px solid #ef4444",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              }}
            >
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: "bold",
                  margin: 0,
                  color: "#334155",
                }}
              >
                {area.name}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "4px",
                }}
              >
                <span style={{ fontSize: "10px", color: "#94a3b8" }}>
                  Dirty Score
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: "#ef4444",
                  }}
                >
                  {area.score.toFixed(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: "auto" }}>
        <button
          onClick={() => exportToCSV(sectors)}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#1e293b",
            color: "white",
            border: "none",
            borderRadius: "12px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "14px",
            transition: "background 0.2s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#334155")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#1e293b")}
        >
          📥 Download CSV Report
        </button>
        <p
          style={{
            fontSize: "10px",
            color: "#94a3b8",
            textAlign: "center",
            marginTop: "10px",
          }}
        >
          Prototype v1.0 • Mumbra Map
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
