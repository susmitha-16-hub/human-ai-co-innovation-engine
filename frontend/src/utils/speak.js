export function speak(text) {
  if (!text) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9;
  utterance.pitch = 1;
  utterance.lang = "en-US";

  window.speechSynthesis.speak(utterance);
}
