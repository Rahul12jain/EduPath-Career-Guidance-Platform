const mongoose = require("mongoose");

const skillResultSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    ratings: {
      analytical: { type: Number, required: true },
      communication: { type: Number, required: true },
      creativity: { type: Number, required: true },
      leadership: { type: Number, required: true },
      technical: { type: Number, required: true },
      empathy: { type: Number, required: true },
      discipline: { type: Number, required: true },
      adaptability: { type: Number, required: true },
    },

    averageScore: {
      type: Number,
      required: true,
    },

    topCareer: {
      fieldId: String,
      title: String,
      score: Number,
    },

    careerMatches: [
      {
        fieldId: String,
        title: String,
        score: Number,
      },
    ],

    strengths: [String],
    improvements: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("SkillResult", skillResultSchema);
