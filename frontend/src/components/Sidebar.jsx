import { Link } from "react-router-dom";

export default function Sidebar() {
  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    padding: "12px",
    display: "block",
    borderRadius: "8px",
  };

  return (
    <div
      style={{
        width: "240px",
        background: "linear-gradient(180deg,#050b3a,#020617)",
        color: "#fff",
        padding: "20px",
      }}
    >
      <h2>✨ Human-AI</h2>

      <Link to="/" style={linkStyle}>🏠 Dashboard</Link>
      <Link to="/risk" style={linkStyle}>📊 Risk Analysis</Link>
      <Link to="/insights" style={linkStyle}>💡 Insights</Link>
      <Link to="/about" style={linkStyle}>ℹ️ About</Link>
    </div>
  );
}
