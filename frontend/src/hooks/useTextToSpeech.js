export const useTextToSpeech = () => {
  const speak = (text) => {
    const msg = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(msg);
  };
  return { speak };
};
