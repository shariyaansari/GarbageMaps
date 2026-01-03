import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import sectorsData from "../data/sectors.json";
import { calculateScore, getAreaColor } from "../utils/mapLogic";
import Legend from "./Legend";

const MapResizer = ({ isOpen }) => {
  const map = useMap();
  
  useEffect(() => {
    // We wait a tiny bit (400ms) for the sidebar animation to finish
    // then we tell Leaflet to fill the new empty space
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 400);

    return () => clearTimeout(timer);
  }, [isOpen, map]);

  return null;
};

const MapControls = ({ sectors }) => {
  const map = useMap();
  const [query, setQuery] = useState("");

  const filtered = sectors.features.filter((f) =>
    f.properties.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      style={{
        position: "absolute",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        width: "320px",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(8px)",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          overflow: "hidden",
          border: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Search Mumbra Sectors..."
          style={{
            width: "100%",
            padding: "14px 20px",
            border: "none",
            outline: "none",
            background: "transparent",
            fontSize: "14px",
          }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <div
            style={{
              maxHeight: "200px",
              overflowY: "auto",
              borderTop: "1px solid #eee",
            }}
          >
            {filtered.map((s, i) => (
              <div
                key={i}
                onClick={() => {
                  const [lng, lat] = s.geometry.coordinates[0][0];
                  map.flyTo([lat, lng], 16, { duration: 1.5 });
                  setQuery("");
                }}
                className="search-result-item" // Add this for a hover effect in CSS
                style={{
                  padding: "12px 20px",
                  cursor: "pointer",
                  fontSize: "13px",
                  borderBottom: "1px solid #f7f7f7",
                }}
              >
                <b>${s.properties.name}</b>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const MumbraMap = ({ isOpen }) => {
  const styleSectors = (feature) => {
    const score = calculateScore(feature.properties);
    return {
      fillColor: getAreaColor(score),
      weight: 1,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7,
    };
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "calc(100vh - 80px)",
      }}
    >
      <MapContainer
        center={[19.1759, 73.0222]}
        zoom={15}
        style={{ height: "100%", width: "100%" }} // FORCING HEIGHT HERE
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapResizer isOpen={isOpen} />

        <MapControls sectors={sectorsData} />

        <GeoJSON
          data={sectorsData}
          style={(feature) => ({
            fillColor: getAreaColor(calculateScore(feature.properties)),
            weight: 1,
            color: "white",
            fillOpacity: 0.7,
          })}
          onEachFeature={(feature, layer) => {
            const p = feature.properties;
            const score = calculateScore(p);
            const healthPercent = ((10 - score) * 10).toFixed(0);
            const status =
              score > 7 ? "CRITICAL" : score > 4 ? "WARNING" : "HEALTHY";
            const statusColor =
              score > 7 ? "#ef4444" : score > 4 ? "#f59e0b" : "#22c55e";

            layer.bindPopup(`
    <div style="font-family: 'Inter', sans-serif; min-width: 200px; padding: 5px;">
      <h3 style="margin: 0 0 10px 0; color: #1a202c; border-bottom: 2px solid #edf2f7; padding-bottom: 5px;">
        ${p.name}
      </h3>
      <div style="margin-bottom: 12px;">
        <span style="font-size: 24px; font-weight: 800; color: ${getAreaColor(
          score
        )};">
          ${healthPercent}%
        </span>
        <span style="font-size: 12px; color: #718096; margin-left: 5px;">Cleanliness Index</span>
      </div>
      <div style="font-family: sans-serif; padding: 5px;">
      <h3 style="margin:0; font-size: 16px;">${p.name}</h3>
      <span style="display:inline-block; margin: 5px 0; padding: 2px 8px; border-radius: 4px; background: ${statusColor}; color: white; font-size: 10px; font-weight: bold;">
        ${status}
      </span>
      <hr style="border: 0; border-top: 1px solid #eee; margin: 10px 0;" />
      <div style="font-size: 12px; line-height: 1.6;">
        <b>Cleanliness Index:</b> ${(10 - score).toFixed(1)}/10<br/>
        <b>Complaints:</b> ${p.complaints} active
      </div>
    </div>
      
      <div style="font-size: 11px; color: #4a5568;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
          <span>Visual Litter</span> <b>${p.litter}/10</b>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
          <span>Bin Overflow</span> <b>${p.overflow}/10</b>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span>Odor/Smell</span> <b>${p.smell}/10</b>
        </div>
      </div>
    </div>
  `);
          }}
        />
      </MapContainer>
      <Legend />
    </div>
  );
};

export default MumbraMap;
