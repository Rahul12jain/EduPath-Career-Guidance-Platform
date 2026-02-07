import { useState } from "react";

const questions = [
  {
    question: "Which activity do you enjoy the most?",
    options: [
      { text: "Solving logical problems", career: "Technology" },
      { text: "Helping sick people", career: "Healthcare" },
      { text: "Managing people or business", career: "Business" },
      { text: "Creating art or designs", career: "Creative Arts" },
    ],
  },
  {
    question: "Which subject do you like the most?",
    options: [
      { text: "Mathematics / Computer Science", career: "Technology" },
      { text: "Biology", career: "Healthcare" },
      { text: "Economics / Commerce", career: "Business" },
      { text: "Drawing / Media", career: "Creative Arts" },
    ],
  },
  {
    question: "How do you prefer to work?",
    options: [
      { text: "Independently with systems", career: "Technology" },
      { text: "Directly with people", career: "Healthcare" },
      { text: "Leading a team", career: "Business" },
      { text: "Expressing creativity", career: "Creative Arts" },
    ],
  },
];

function CareerQuiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (career) => {
    setAnswers([...answers, career]);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const getResult = () => {
    const count = {};
    answers.forEach((career) => {
      count[career] = (count[career] || 0) + 1;
    });

    return Object.keys(count).reduce((a, b) => (count[a] > count[b] ? a : b));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-24">
      <div className="bg-white rounded-xl shadow p-8 max-w-xl w-full">
        {!showResult ? (
          <>
            <h2 className="text-xl font-bold mb-4">
              Career Quiz ({current + 1}/{questions.length})
            </h2>

            <p className="mb-6 text-gray-700">{questions[current].question}</p>

            <div className="space-y-3">
              {questions[current].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.career)}
                  className="w-full text-left px-4 py-3 border rounded-lg hover:bg-blue-50 transition"
                >
                  {option.text}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">
              Your Recommended Career
            </h2>

            <p className="text-center text-lg text-blue-600 font-semibold">
              {getResult()}
            </p>

            <p className="text-center text-gray-600 mt-4">
              This result is based on your interests and preferences.
            </p>

            <button
              onClick={() => {
                setCurrent(0);
                setAnswers([]);
                setShowResult(false);
              }}
              className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Retake Quiz
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default CareerQuiz;
