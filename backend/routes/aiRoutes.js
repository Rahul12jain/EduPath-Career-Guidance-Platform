const express = require("express");
const { getCareerAdvice } = require("../controllers/aiController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/career-advice", protect, getCareerAdvice);

module.exports = router;
