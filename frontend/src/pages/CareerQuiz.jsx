import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const questions = [
  {
    id: "1",
    question: "Which subject do you enjoy most?",
    options: ["Math", "Biology", "Business", "Arts"],
  },
  {
    id: "2",
    question: "What type of tasks do you prefer?",
    options: [
      "Problem Solving",
      "Helping People",
      "Managing Things",
      "Creative Work",
    ],
  },
  {
    id: "3",
    question: "What motivates you the most?",
    options: [
      "Building Technology",
      "Saving Lives",
      "Leading Teams",
      "Designing Experiences",
    ],
  },
  {
    id: "4",
    question: "Which environment do you prefer?",
    options: ["Tech Company", "Hospital", "Corporate Office", "Creative Studio"],
  },
  {
    id: "5",
    question: "Which skill describes you best?",
    options: ["Logical Thinking", "Empathy", "Leadership", "Creativity"],
  },
  {
    id: "6",
    question: "How do you solve problems?",
    options: [
      "Write code",
      "Research and diagnose",
      "Strategize plans",
      "Sketch ideas",
    ],
  },
  {
    id: "7",
    question: "What kind of projects excite you?",
    options: [
      "Apps & Software",
      "Medical Research",
      "Startups",
      "Design Portfolios",
    ],
  },
  {
    id: "8",
    question: "What is your dream workplace?",
    options: [
      "Tech Startup",
      "Medical Center",
      "Corporate Firm",
      "Design Agency",
    ],
  },
  {
    id: "9",
    question: "Which strength defines you?",
    options: [
      "Analytical Thinking",
      "Compassion",
      "Decision Making",
      "Imagination",
    ],
  },
  {
    id: "10",
    question: "What role do you prefer in a team?",
    options: ["Technical Expert", "Caregiver", "Team Leader", "Creative Head"],
  },
];

function CareerQuiz() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const progress = ((current) / questions.length) * 100;

  const handleAnswer = async (option) => {
    const updated = [
      ...answers,
      { questionId: questions[current].id, answer: option },
    ];
    setAnswers(updated);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      // Last question answered — submit to backend
      setSubmitting(true);
      setError("");

      try {
        await API.post("/quiz/submit", { answers: updated });
        navigate("/dashboard");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to submit quiz. Please try again.");
        setSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const selectedAnswer = answers[current]?.answer;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-24 pb-16">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl w-full">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Question {current + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          {questions[current].question}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {questions[current].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={submitting}
              className={`w-full text-left px-5 py-4 border-2 rounded-lg transition-all ${
                selectedAnswer === option
                  ? "border-blue-600 bg-blue-50 text-blue-700 font-medium"
                  : "border-gray-200 hover:border-blue-400 hover:bg-blue-50"
              } ${submitting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 text-sm font-semibold text-gray-600 mr-3">
                {String.fromCharCode(65 + index)}
              </span>
              {option}
            </button>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={current === 0 || submitting}
            className={`text-sm font-medium ${
              current === 0 || submitting
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            ← Back
          </button>

          {submitting && (
            <div className="flex items-center gap-2 text-sm text-blue-600 font-medium">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Submitting...
            </div>
          )}

          <span className="text-sm text-gray-400">
            {questions.length - current - 1} questions left
          </span>
        </div>
      </div>
    </div>
  );
}

export default CareerQuiz;
