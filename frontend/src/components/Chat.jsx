import { useState } from "react";
import { useVoiceInput } from "../hooks/useVoiceInput";
import { useTextToSpeech } from "../hooks/useTextToSpeech";

export default function Chat({ setAnalysis, setHistory }) {
  const [idea, setIdea] = useState("");
  const { startListening } = useVoiceInput(setIdea);
  const { speak } = useTextToSpeech();

  const analyze = async () => {
    const res = await fetch("http://localhost:5000/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idea })
    });

    const data = await res.json();
    setAnalysis(data);
    setHistory(h => [...h, idea]);

    speak(data.improvement_suggestion);
  };

  return (
    <div className="card">
      <h2>✌HUMAN_AI_CO-INNOVATION_ENGINE✌</h2>

      <textarea
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder="Speak or type your innovation idea…"
      />

      <button onClick={startListening}>🎤 Speak Mode</button>
      <button onClick={analyze}>📊 Analyze</button>
    </div>
  );
}
