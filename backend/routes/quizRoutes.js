const express = require("express");
const {
  submitQuiz,
  getLatestQuiz,
  getAllQuizzes,
  deleteQuiz,
} = require("../controllers/quizController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/submit", protect, submitQuiz);
router.get("/latest", protect, getLatestQuiz);
router.get("/all", protect, getAllQuizzes);
router.delete("/:id", protect, deleteQuiz);

console.log("submitQuiz:", submitQuiz);
console.log("getLatestQuiz:", getLatestQuiz);
console.log("getAllQuizzes:", getAllQuizzes);
console.log("deleteQuiz:", deleteQuiz);
console.log("protect:", protect);

module.exports = router;

