export default function RiskSummary({ analysis }) {
  if (!analysis) return <div className="card">Waiting for analysis…</div>;

  return (
    <div className="card">
      <h3>📌 Risk Summary</h3>
      <p>🔧 Technical: {analysis.risks.technical}</p>
      <p>⚖️ Ethical: {analysis.risks.ethical}</p>
      <p>📈 Scalability: {analysis.risks.scalability}</p>
    </div>
  );
}
