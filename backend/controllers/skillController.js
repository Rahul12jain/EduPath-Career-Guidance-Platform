const SkillResult = require("../models/SkillResult");

// Submit Skill Assessment
exports.submitSkill = async (req, res) => {
  try {
    const { ratings, averageScore, topCareer, careerMatches, strengths, improvements } = req.body;

    const result = await SkillResult.create({
      user: req.user._id,
      ratings,
      averageScore,
      topCareer,
      careerMatches,
      strengths,
      improvements,
    });

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving skill assessment" });
  }
};

// Get Latest Skill Result
exports.getLatestSkill = async (req, res) => {
  try {
    const latest = await SkillResult.findOne({ user: req.user._id }).sort({
      createdAt: -1,
    });

    if (!latest) {
      return res.status(404).json({ message: "No skill assessment found" });
    }

    res.status(200).json(latest);
  } catch (error) {
    res.status(500).json({ message: "Error fetching skill assessment" });
  }
};

// Get All Skill Results
exports.getAllSkills = async (req, res) => {
  try {
    const results = await SkillResult.find({ user: req.user._id })
      .select("averageScore topCareer strengths improvements ratings createdAt")
      .sort({ createdAt: -1 });

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Error fetching skill assessments" });
  }
};

// Delete Skill Result
exports.deleteSkill = async (req, res) => {
  try {
    const result = await SkillResult.findById(req.params.id);

    if (!result) {
      return res.status(404).json({ message: "Skill assessment not found" });
    }

    if (result.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await result.deleteOne();

    res.status(200).json({ message: "Skill assessment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting skill assessment" });
  }
};
