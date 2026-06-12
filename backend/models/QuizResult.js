const mongoose = require("mongoose");

const quizResultSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    answers: [
      {
        questionId: String,
        answer: String,
      },
    ],

    careerSuggestion: {
      type: String,
    },

    scoreBreakdown: [
      {
        careerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Career",
          required: true,
        },
        careerName: {
          type: String,
          required: true,
        },
        percentage: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("QuizResult", quizResultSchema);