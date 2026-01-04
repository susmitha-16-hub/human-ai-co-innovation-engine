export default function RiskBars({ risks }) {
  const score = r => r === "High" ? 3 : r === "Medium" ? 2 : 1;

  const bars = [
    { label: "Tech", value: score(risks.technical), color: "#ff4d6d" },
    { label: "Ethic", value: score(risks.ethical), color: "#4dd0ff" },
    { label: "Scale", value: score(risks.scalability), color: "#f7b731" }
  ];

  return (
    <div className="bar-container">
      {bars.map(b => (
        <div key={b.label} className="bar-box">
          <div className="bar" style={{
            height: `${b.value * 30}px`,
            background: b.color
          }} />
          <small>{b.label} {b.value}/3</small>
        </div>
      ))}
    </div>
  );
}
