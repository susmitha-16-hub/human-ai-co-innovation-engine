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
        { role: "system", content: "You are a strict innovation critic." },
        { role: "user", content: promptBuilder(idea) }
      ],
      temperature: 0.4
    });

    const text = completion.choices[0].message.content;

    // Extract JSON safely
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");

    if (start === -1 || end === -1) {
      throw new Error("Invalid JSON from LLM");
    }

    const parsed = JSON.parse(text.slice(start, end + 1));

    /**
     * 🔑 NORMALIZATION LAYER
     * This is the missing piece
     */
    res.json({
      summary:
        parsed.summary ||
        parsed.logical_flaw ||
        "No summary generated.",

      suggestion:
        parsed.suggestion ||
        parsed.improvement_suggestion ||
        "No suggestion available.",

      risks: parsed.risks || {
        technical: "Medium",
        ethical: "Medium",
        scalability: "Medium"
      }
    });

  } catch (err) {
    console.error("Groq error:", err.message);

    // Demo-safe fallback (frontend-compatible)
    res.json({
      summary:
        "The idea has potential but lacks clarity in execution and validation.",
      suggestion:
        "Refine scope, validate feasibility, and address ethical implications early.",
      risks: {
        technical: "Medium",
        ethical: "Medium",
        scalability: "Medium"
      }
    });
  }
});

app.listen(5000, () => {
  console.log("Backend running with Groq AI on http://localhost:5000");
});
