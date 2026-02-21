// const mongoose = require("mongoose");

// const quizResultSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     answers: [
//       {
//         questionId: String,
//         answer: String,
//       },
//     ],
//     careerSuggestion: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true },
// );

// module.exports = mongoose.model("QuizResult", quizResultSchema);

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
    careerSuggestion: String,
    scoreBreakdown: Object, // NEW
  },
  { timestamps: true },
);

module.exports = mongoose.model("QuizResult", quizResultSchema);