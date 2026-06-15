const { GoogleGenAI } = require("@google/genai");

const QuizResult = require("../models/QuizResult");
const SkillResult = require("../models/SkillResult");

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const parseGeminiErrorMessage = (error) => {
  if (!error?.message) return null;

  try {
    return JSON.parse(error.message);
  } catch {
    return null;
  }
};

exports.getCareerAdvice = async (req, res) => {
  try {
    // Fetch user's latest quiz and skill data from DB
    const [latestQuiz, latestSkill] = await Promise.all([
      QuizResult.findOne({ user: req.user._id }).sort({ createdAt: -1 }),
      SkillResult.findOne({ user: req.user._id }).sort({ createdAt: -1 }),
    ]);

    if (!latestQuiz && !latestSkill) {
      return res.status(400).json({
        message:
          "No assessment data found. Please take the Career Quiz or Skill Assessment first.",
      });
    }

    // Build the context from user data
    let userContext = "## Student's Assessment Data\n\n";

    if (latestQuiz) {
      userContext += `### Career Quiz Results\n`;
      userContext += `- **Top Career Match:** ${latestQuiz.careerSuggestion}\n`;
      if (latestQuiz.scoreBreakdown?.length > 0) {
        userContext += `- **Score Breakdown:**\n`;
        latestQuiz.scoreBreakdown.forEach((s) => {
          userContext += `  - ${s.careerName}: ${s.percentage}%\n`;
        });
      }
      userContext += "\n";
    }

    if (latestSkill) {
      userContext += `### Skill Assessment Results\n`;
      userContext += `- **Average Skill Score:** ${latestSkill.averageScore}/5\n`;
      userContext += `- **Top Career Match:** ${latestSkill.topCareer?.title} (${latestSkill.topCareer?.score}% match)\n`;

      if (latestSkill.ratings) {
        userContext += `- **Skill Ratings (out of 5):**\n`;
        const skillNames = {
          analytical: "Analytical Thinking",
          communication: "Communication",
          creativity: "Creativity",
          leadership: "Leadership",
          technical: "Technical Skills",
          empathy: "Empathy & Patience",
          discipline: "Discipline & Focus",
          adaptability: "Adaptability",
        };
        Object.entries(latestSkill.ratings).forEach(([key, val]) => {
          userContext += `  - ${skillNames[key] || key}: ${val}/5\n`;
        });
      }

      if (latestSkill.strengths?.length > 0) {
        userContext += `- **Strengths:** ${latestSkill.strengths.join(", ")}\n`;
      }
      if (latestSkill.improvements?.length > 0) {
        userContext += `- **Areas to Improve:** ${latestSkill.improvements.join(", ")}\n`;
      }
      userContext += "\n";
    }

    // Build the prompt
    const prompt = `You are an experienced career counselor for Indian students (Class 10-12 and college-level).

A student has completed assessments on the EduPath platform. Based on their data below, create a **personalized 3-month career action plan**.

${userContext}

---

Please generate the following in **markdown format**:

## 🎯 Career Direction Summary
A 2-3 sentence summary of what career path best fits this student and why, based on their data.

## 📅 3-Month Action Plan

### Month 1: Foundation Building
- 4-5 specific, actionable tasks to build their foundation in the recommended career direction
- Focus on addressing their weakest skills first

### Month 2: Skill Development
- 4-5 tasks focused on intermediate skill building
- Include specific courses, projects, or activities

### Month 3: Portfolio & Preparation
- 4-5 tasks focused on creating tangible outputs
- Projects they can showcase, exams to prepare for, portfolio pieces to build

## 📚 Recommended Resources
- List exactly 5 **specific, free online resources** (with platform names like Coursera, Khan Academy, freeCodeCamp, YouTube channels, etc.)
- Each resource should directly address one of their skill gaps

## 💡 Project Ideas
- Suggest 3 **specific project ideas** they can build to strengthen their profile
- Each project should be achievable in 2-4 weeks and directly relevant to their career match

## ⚠️ Key Exams & Deadlines
- List 3-4 relevant competitive exams or important deadlines for their career path in India
- Include approximate dates/months where applicable

## 💪 Motivation
End with a brief 2-3 sentence personalized encouragement based on their strengths.

---

**Important guidelines:**
- Be specific, not generic. Reference their actual skill scores and career match.
- Keep the tone encouraging but realistic and practical.
- All suggestions should be relevant to the Indian education system and job market.
- Do NOT add any disclaimers or caveats about being an AI.`;

    // Call Gemini API
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const advice = response.text;

    res.status(200).json({ advice });
  } catch (error) {
    console.error("AI Advice Error:", error);

    const geminiError = parseGeminiErrorMessage(error);
    const statusCode = error.status || geminiError?.error?.code;
    const geminiMessage = geminiError?.error?.message || error.message || "";
    const isQuotaError =
      statusCode === 429 ||
      geminiError?.error?.status === "RESOURCE_EXHAUSTED" ||
      /quota|rate limit|resource_exhausted/i.test(geminiMessage);

    if (isQuotaError) {
      return res.status(429).json({
        message:
          "Gemini API quota is exhausted for this key/project. Please wait, enable billing, or use a key with available quota.",
      });
    }

    res.status(500).json({
      message: "Failed to generate career advice. Please try again.",
    });
  }
};
