import { useState } from "react";

export default function RiskAnalysis() {
  const [idea, setIdea] = useState("");
  const [output, setOutput] = useState("");

  const analyzeIdea = async () => {
  try {
    const response = await fetch(
      "https://human-ai-co-innovation-engine.onrender.com/analyze",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea })
      }
    );

    const data = await response.json();

    setLogicalFlaw(data.logical_flaw || "No summary");
    setSuggestion(data.improvement_suggestion || "No suggestion");
    setRisks(
      data.risks || {
        technical: "Medium",
        ethical: "Medium",
        scalability: "Medium"
      }
    );
  } catch (err) {
    setLogicalFlaw("Frontend error");
    console.error(err);
  }
};



  return (
    <div style={{ color: "#fff", padding: "20px" }}>
      <h1>Risk Analysis</h1>

      <textarea
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder="Type your idea here"
        style={{
          width: "100%",
          height: "120px",
          padding: "10px",
          borderRadius: "8px"
        }}
      />

      <br /><br />

      <button onClick={analyzeIdea}>Analyze</button>

      <pre
        style={{
          marginTop: "20px",
          background: "#111",
          padding: "15px",
          whiteSpace: "pre-wrap",
          borderRadius: "8px"
        }}
      >
        {output}
      </pre>
    </div>
  );
}


