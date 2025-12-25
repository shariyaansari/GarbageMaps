import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Circle,
} from "react-leaflet";
import { useState } from "react";

function ClickHandler({ setLocation }) {
  useMapEvents({
    click(e) {
      setLocation(e.latlng);
    },
  });
  return null;
}

function saveReport(report) {
  const existing = JSON.parse(localStorage.getItem("reports")) || [];
  existing.push(report);
  localStorage.setItem("reports", JSON.stringify(existing));
}

function getReports() {
  return JSON.parse(localStorage.getItem("reports")) || [];
}

function getColorBySeverity(severity) {
  if (severity === "Low") return "green";
  if (severity === "Medium") return "orange";
  return "red";
}

function App() {
  const [location, setLocation] = useState(null);
  const [garbageType, setGarbageType] = useState("");
  const [severity, setSeverity] = useState("Low");
  const reports = getReports();

  const handleLiveLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        alert("Location permission denied");
      }
    );
  };

  const handleSubmit = () => {
    const report = {
      latitude: location.lat,
      longitude: location.lng,
      garbageType,
      severity,
      timestamp: new Date().toISOString(),
    };

    saveReport(report);

    alert("Garbage report saved!");

    // Reset UI
    setGarbageType("");
    setSeverity("Low");
    setLocation(null);
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "50px",
          background: "#1e293b",
          color: "white",
          display: "flex",
          alignItems: "center",
          paddingLeft: "16px",
          zIndex: 1000,
          fontWeight: "bold",
        }}
      >
        🧹 Clean Area Detection & Garbage Reporting
      </div>
      <MapContainer
        center={[19.076, 72.877]}
        zoom={10}
        style={{ height: "calc(100vh - 50px)", marginTop: "50px"  }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <ClickHandler setLocation={setLocation} />

        {location && <Marker position={[location.lat, location.lng]} />}

        {/* Marker on the map */}
        {reports.map((report, index) => (
          <Circle
            key={index}
            center={[report.latitude, report.longitude]}
            radius={300}
            pathOptions={{
              color: getColorBySeverity(report.severity),
              fillOpacity: 0.25,
            }}
          />
        ))}
      </MapContainer>

      {location && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "20px",
            background: "#ffffff",
            padding: "16px",
            borderRadius: "12px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            zIndex: 1000,
            width: "260px",
            fontFamily: "system-ui",
          }}
        >
          <h3 style={{ marginBottom: "10px" }}>🗑️ Report Garbage</h3>

          <input
            type="text"
            placeholder="Garbage type (e.g. Plastic)"
            value={garbageType}
            onChange={(e) => setGarbageType(e.target.value)}
            style={{
              width: "94%",
              padding: "8px",
              marginBottom: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />

          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <button
            onClick={handleLiveLocation}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "8px",
              borderRadius: "6px",
              background: "#2563eb",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            📍 Use My Location
          </button>

          <button
            onClick={handleSubmit}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "6px",
              background: "#16a34a",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Submit Report
          </button>
        </div>
      )}
    </>
  );
}

export default App;
