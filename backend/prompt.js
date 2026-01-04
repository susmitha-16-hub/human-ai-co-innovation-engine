export default function promptBuilder(idea) {
  return `
You are a strict innovation critic.

Analyze the following idea.
Do NOT praise it.

IDEA:
"${idea}"

Return ONLY valid JSON in this exact format:

{
  "logical_flaw": "string",
  "risks": {
    "technical": "Low | Medium | High",
    "ethical": "Low | Medium | High",
    "scalability": "Low | Medium | High"
  },
  "improvement_suggestion": "string"
}
`;
}
