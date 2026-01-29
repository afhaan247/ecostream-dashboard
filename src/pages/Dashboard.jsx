import React, { useEffect, useState } from "react";
import { generateEmissionData } from "../services/mockData";
import EmissionChart from "../components/EmissionChart";

function Dashboard() {
  const [data, setData] = useState(generateEmissionData());
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = generateEmissionData();
      setData(newData);
      setHistory((prev) => [...prev.slice(-19), newData.pm25]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const statusColor =
    data.status === "safe"
      ? "#16a34a"
      : data.status === "warning"
      ? "#f59e0b"
      : "#dc2626";

  return (
    <div
      style={{
        background: "#f5f7fa",
        minHeight: "100vh",
        padding: "32px",
        fontFamily: "sans-serif",
      }}
    >
      {/* ===== HEADER ===== */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ margin: 0 }}>EcoStream</h1>
        <p style={{ margin: "4px 0", color: "#4b5563" }}>
          IoT-Powered Industrial Emission Intelligence
        </p>
        <p style={{ fontSize: "14px", color: "#6b7280" }}>
          Factory: Cement Plant A · Stack ID: ST-01
        </p>
      </div>

      {/* ===== METRIC CARDS ===== */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h3 style={{ margin: 0, color: "#374151" }}>
            PM2.5 Concentration
          </h3>
          <h2 style={{ marginTop: "8px" }}>{data.pm25} µg/m³</h2>
        </div>

        <div
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h3 style={{ margin: 0, color: "#374151" }}>
            SO₂ Level
          </h3>
          <h2 style={{ marginTop: "8px" }}>{data.so2} ppm</h2>
        </div>

        <div
          style={{
            background: statusColor,
            padding: "20px",
            borderRadius: "8px",
            color: "#ffffff",
          }}
        >
          <h3 style={{ margin: 0 }}>Compliance Status</h3>
          <h2 style={{ marginTop: "8px" }}>
            {data.status.toUpperCase()}
          </h2>
          <p style={{ fontSize: "14px", opacity: 0.9 }}>
            Threshold-based monitoring
          </p>
        </div>
      </div>

      {/* ===== TIMESTAMP ===== */}
      <p style={{ marginTop: "24px" }}>
        Last updated: <b>{data.timestamp}</b>
      </p>

      <hr style={{ margin: "32px 0", borderColor: "#e5e7eb" }} />

      {/* ===== EMISSION GRAPH ===== */}
      <EmissionChart history={history} />

      {/* ===== FOOTER NOTE ===== */}
      <p style={{ fontSize: "12px", color: "#6b7280", marginTop: "24px" }}>
        Live data stream · Auto-refresh every 3 seconds
      </p>
    </div>
  );
}

export default Dashboard;
