export default function History({ history }) {
  return (
    <div className="card">
      <h3>🕒 Idea History</h3>
      {history.length === 0 && <p>No ideas yet</p>}
      {history.map((idea, i) => (
        <p key={i}>• {idea}</p>
      ))}
    </div>
  );
}
