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

module.exports = router;

