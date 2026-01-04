import { useState } from "react";
import axios from "axios";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

const COLORS = ["#ff4d6d", "#4dabf7", "#ffd166"];

export default function RiskAnalysis() {
  const [idea, setIdea] = useState("");
  const [logicalFlaw, setLogicalFlaw] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [listening, setListening] = useState(false);

  const [risks, setRisks] = useState({
    technical: "Medium",
    ethical: "Medium",
    scalability: "Medium"
  });

  const riskValue = {
    Low: 1,
    Medium: 2,
    High: 3
  };

  /* ---------- 🎤 VOICE INPUT ---------- */
  const startVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      setIdea(event.results[0][0].transcript);
      setListening(false);
    };

    recognition.onerror = () => setListening(false);
  };

  /* ---------- 🔊 AUTO SPEAK (RISK EXPLANATION ONLY) ---------- */
  const autoSpeakRisk = (summaryText, suggestionText) => {
    if (!summaryText && !suggestionText) return;

    window.speechSynthesis.cancel();

    const message = new SpeechSynthesisUtterance(
      `Risk explanation. ${summaryText}. Suggested improvement. ${suggestionText}.`
    );
    message.rate = 0.95;
    message.pitch = 1;

    window.speechSynthesis.speak(message);
  };

  /* ---------- 📊 ANALYZE ---------- */
  const analyzeIdea = async () => {
  alert("Analyze button clicked");

  try {
    const res = await fetch(
      "https://human-ai-co-innovation-engine.onrender.com/analyze",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ idea })
      }
    );

    alert("Request sent to backend");

    const data = await res.json();
    alert("Response received");

    setLogicalFlaw(data.logical_flaw || "NO logical_flaw");
    setSuggestion(data.improvement_suggestion || "NO suggestion");
    setRisks(data.risks || {
      technical: "Medium",
      ethical: "Medium",
      scalability: "Medium"
    });

  } catch (err) {
    alert("ERROR: Backend not reachable");
    console.error(err);
  }
};


  const pieData = [
    { name: "Technical", value: riskValue[risks.technical] },
    { name: "Ethical", value: riskValue[risks.ethical] },
    { name: "Scalability", value: riskValue[risks.scalability] }
  ];

  const barData = [
    { name: "Technical", risk: riskValue[risks.technical] },
    { name: "Ethical", risk: riskValue[risks.ethical] },
    { name: "Scalability", risk: riskValue[risks.scalability] }
  ];

  const overallScore = Math.round(
    ((riskValue[risks.technical] +
      riskValue[risks.ethical] +
      riskValue[risks.scalability]) /
      9) *
      10
  );

  return (
    <div style={{ color: "#fff", padding: "20px" }}>
      <h1>Risk Analysis</h1>

      <textarea
        placeholder="Type or speak your idea..."
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        style={{
          width: "100%",
          padding: "15px",
          fontSize: "16px",
          borderRadius: "10px"
        }}
      />

      {/* BUTTONS */}
      <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
        <button onClick={startVoiceInput}>
          🎤 {listening ? "Listening..." : "Speak"}
        </button>

        <button onClick={analyzeIdea}>Analyze</button>
      </div>

      {/* ===== AI RISK DETAILS ===== */}
      {logicalFlaw && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            background: "#0b132b",
            borderRadius: "15px"
          }}
        >
          <h2>AI Risk Details</h2>

          <h3 style={{ color: "#facc15" }}>
            Overall Risk Score: {overallScore} / 10
          </h3>

          <p>
            <strong>Summary:</strong> {logicalFlaw}
          </p>

          <p>
            <strong>Suggestion:</strong> {suggestion}
          </p>
        </div>
      )}

      {/* ===== CHARTS ===== */}
      {logicalFlaw && (
        <div
          style={{
            display: "flex",
            gap: "30px",
            marginTop: "30px"
          }}
        >
          {/* PIE */}
          <div
            style={{
              background: "#0b132b",
              padding: "20px",
              borderRadius: "15px"
            }}
          >
            <h3>Risk Distribution</h3>
            <PieChart width={300} height={300}>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                animationDuration={1000}
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>

          {/* BAR */}
          <div
            style={{
              background: "#0b132b",
              padding: "20px",
              borderRadius: "15px"
            }}
          >
            <h3>Risk Comparison</h3>
            <BarChart width={300} height={300} data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 3]} />
              <Tooltip />
              <Bar
                dataKey="risk"
                fill="#4dabf7"
                animationDuration={1000}
              />
            </BarChart>
          </div>
        </div>
      )}
    </div>
  );
}



