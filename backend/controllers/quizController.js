const QuizResult = require("../models/QuizResult");

// Save Quiz Result
exports.submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body;

    const careerMap = {
      // Developer
      Math: "developer",
      "Problem Solving": "developer",
      "Building Technology": "developer",
      "Tech Company": "developer",
      "Logical Thinking": "developer",
      "Write code": "developer",
      "Apps & Software": "developer",
      "Tech Startup": "developer",
      "Analytical Thinking": "developer",
      "Technical Expert": "developer",

      // Doctor
      Biology: "doctor",
      "Helping People": "doctor",
      "Saving Lives": "doctor",
      Hospital: "doctor",
      Empathy: "doctor",
      "Research and diagnose": "doctor",
      "Medical Research": "doctor",
      "Medical Center": "doctor",
      Compassion: "doctor",
      Caregiver: "doctor",

      // Business
      Business: "business",
      "Managing Things": "business",
      "Leading Teams": "business",
      "Corporate Office": "business",
      Leadership: "business",
      "Strategize plans": "business",
      Startups: "business",
      "Corporate Firm": "business",
      "Decision Making": "business",
      "Team Leader": "business",

      // Designer
      Arts: "designer",
      "Creative Work": "designer",
      "Designing Experiences": "designer",
      "Creative Studio": "designer",
      Creativity: "designer",
      "Sketch ideas": "designer",
      "Design Portfolios": "designer",
      "Design Agency": "designer",
      Imagination: "designer",
      "Creative Head": "designer",
    };

    const careerTitles = {
      developer: "Software Developer",
      doctor: "Doctor",
      business: "Business Analyst",
      designer: "UI/UX Designer",
    };

    let scores = {
      developer: 0,
      doctor: 0,
      business: 0,
      designer: 0,
    };

    answers.forEach((item) => {
      const category = careerMap[item.answer];
      if (category) {
        scores[category]++;
      }
    });

    const totalAnswers = answers.length;

    // Convert to percentages
    let breakdown = [];

    for (let key in scores) {
      const percentage = ((scores[key] / totalAnswers) * 100).toFixed(0);

      breakdown.push({
        career: careerTitles[key],
        percentage: Number(percentage),
      });
    }

    // Sort highest first
    breakdown.sort((a, b) => b.percentage - a.percentage);

    const topCareer = breakdown[0].career;

    const result = await QuizResult.create({
      user: req.user._id,
      answers,
      careerSuggestion: topCareer,
      scoreBreakdown: breakdown,
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error submitting quiz" });
  }
};

// Get Latest Quiz Result
exports.getLatestQuiz = async (req, res) => {
  try {
    const latest = await QuizResult.findOne({ user: req.user._id })
      .sort({ createdAt: -1 });

    if (!latest) {
      return res.status(404).json({ message: "No quiz found" });
    }

    res.status(200).json(latest);

  } catch (error) {
    res.status(500).json({ message: "Error fetching latest quiz" });
  }
};

// Get All Quiz Results
exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await QuizResult.find({ user: req.user._id })
      .select("careerSuggestion scoreBreakdown createdAt")
      .sort({ createdAt: -1 });

    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quizzes" });
  }
};


// Delete Quiz Result
exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await QuizResult.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    if (quiz.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await quiz.deleteOne();

    res.status(200).json({ message: "Quiz deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error deleting quiz" });
  }
};
