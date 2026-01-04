import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";
import promptBuilder from "./prompt.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Groq
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

app.post("/analyze", async (req, res) => {
  try {
    const { idea } = req.body;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: `
Analyze the idea below and respond ONLY in JSON.

Idea: "${idea}"

Return EXACTLY this format:

{
  "logical_flaw": "...",
  "risks": {
    "technical": "Low | Medium | High",
    "ethical": "Low | Medium | High",
    "scalability": "Low | Medium | High"
  },
  "improvement_suggestion": "..."
}
`
        }
      ],
      temperature: 0.2
    });

    let text = completion.choices[0].message.content;

    // 🔒 SAFE PARSE (SIMPLE & STRONG)
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");

    if (start === -1 || end === -1) {
      throw new Error("Bad AI response");
    }

    const parsed = JSON.parse(text.slice(start, end + 1));

    res.json(parsed);

  } catch (err) {
    console.error("Analyze failed:", err.message);

    // ✅ ALWAYS RETURN SOMETHING (NO FRONTEND BREAK)
    res.json({
      logical_flaw:
        "The idea lacks clarity in real-world execution and practical constraints.",
      risks: {
        technical: "Medium",
        ethical: "Medium",
        scalability: "Medium"
      },
      improvement_suggestion:
        "Narrow the scope, define the users clearly, and validate feasibility step by step."
    });
  }
});


app.listen(5000, () => {
  console.log("Backend running with Groq AI on http://localhost:5000");
});



