export const handleVoiceCommand = async ({
  phrase,
  onAnalyze,
  onClear,
  onSpeak
}) => {
  if (!phrase.startsWith("hey innovator")) return;

  if (phrase.includes("analyze")) {
    const data = await onAnalyze();
    onSpeak(data);
  }

  if (phrase.includes("clear")) {
    onClear();
  }
};
