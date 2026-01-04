import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import RiskAnalysis from "./pages/RiskAnalysis";
import Insights from "./pages/Insights";
import About from "./pages/About";

export default function App() {
  const [page, setPage] = useState("risk");

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#020617" }}>
      {/* Sidebar */}
      <div style={{ width: 220, padding: 20, color: "#fff" }}>
        <h2>✨ Human-AI</h2>
        <p onClick={() => setPage("dashboard")}>🏠 Dashboard</p>
        <p onClick={() => setPage("risk")}>📊 Risk Analysis</p>
        <p onClick={() => setPage("insights")}>💡 Insights</p>
        <p onClick={() => setPage("about")}>ℹ️ About</p>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: 30 }}>
        {page === "dashboard" && <Dashboard />}
        {page === "risk" && <RiskAnalysis />}
        {page === "insights" && <Insights />}
        {page === "about" && <About />}
      </div>
    </div>
  );
}
