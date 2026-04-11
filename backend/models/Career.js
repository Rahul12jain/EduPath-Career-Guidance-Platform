const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true }, // developer, doctor
  title: { type: String, required: true }, // Software Developer
  overview: String,
  skills: [String],
  roadmap: [String],
  salaryRangeIndia: String,
  growthTrend: String,
});

module.exports = mongoose.model("Career", careerSchema);
