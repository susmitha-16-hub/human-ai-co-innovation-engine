export const useVoiceInput = (setText) => {
  const startListening = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SR();
    rec.lang = "en-US";
    rec.start();
    rec.onresult = e => setText(e.results[0][0].transcript);
  };
  return { startListening };
};
