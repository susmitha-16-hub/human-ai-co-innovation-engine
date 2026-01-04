import { useState } from "react";
import RiskPie from "./RiskPie";
import RiskBars from "./RiskBars";

export default function Risks({ analysis }) {
  const [focus, setFocus] = useState(null);
  if (!analysis) return <div className="card">No analysis yet</div>;

  return (
    <div className="risk-columns">
      <div className="card">
        <h3>🧠 AI Risk Details</h3>
        <p>{analysis.logical_flaw}</p>
        <p>{analysis.improvement_suggestion}</p>
      </div>

      <div className="card chart-box">
        <RiskPie risks={analysis.risks} />
      </div>

      <div className="card chart-box">
        <RiskBars risks={analysis.risks} setFocus={setFocus} />
      </div>
    </div>
  );
}
