const express = require("express");
const {
  submitSkill,
  getLatestSkill,
  getAllSkills,
  deleteSkill,
} = require("../controllers/skillController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/submit", protect, submitSkill);
router.get("/latest", protect, getLatestSkill);
router.get("/all", protect, getAllSkills);
router.delete("/:id", protect, deleteSkill);

module.exports = router;
