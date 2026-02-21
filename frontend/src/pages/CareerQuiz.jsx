// import { useState } from "react";

// const questions = [
//   {
//     question: "Which activity do you enjoy the most?",
//     options: [
//       { text: "Solving logical problems", career: "Technology" },
//       { text: "Helping sick people", career: "Healthcare" },
//       { text: "Managing people or business", career: "Business" },
//       { text: "Creating art or designs", career: "Creative Arts" },
//     ],
//   },
//   {
//     question: "Which subject do you like the most?",
//     options: [
//       { text: "Mathematics / Computer Science", career: "Technology" },
//       { text: "Biology", career: "Healthcare" },
//       { text: "Economics / Commerce", career: "Business" },
//       { text: "Drawing / Media", career: "Creative Arts" },
//     ],
//   },
//   {
//     question: "How do you prefer to work?",
//     options: [
//       { text: "Independently with systems", career: "Technology" },
//       { text: "Directly with people", career: "Healthcare" },
//       { text: "Leading a team", career: "Business" },
//       { text: "Expressing creativity", career: "Creative Arts" },
//     ],
//   },
// ];

// function CareerQuiz() {
//   const [current, setCurrent] = useState(0);
//   const [answers, setAnswers] = useState([]);
//   const [showResult, setShowResult] = useState(false);

//   const handleAnswer = (career) => {
//     setAnswers([...answers, career]);

//     if (current + 1 < questions.length) {
//       setCurrent(current + 1);
//     } else {
//       setShowResult(true);
//     }
//   };

//   const getResult = () => {
//     const count = {};
//     answers.forEach((career) => {
//       count[career] = (count[career] || 0) + 1;
//     });

//     return Object.keys(count).reduce((a, b) => (count[a] > count[b] ? a : b));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-24">
//       <div className="bg-white rounded-xl shadow p-8 max-w-xl w-full">
//         {!showResult ? (
//           <>
//             <h2 className="text-xl font-bold mb-4">
//               Career Quiz ({current + 1}/{questions.length})
//             </h2>

//             <p className="mb-6 text-gray-700">{questions[current].question}</p>

//             <div className="space-y-3">
//               {questions[current].options.map((option, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleAnswer(option.career)}
//                   className="w-full text-left px-4 py-3 border rounded-lg hover:bg-blue-50 transition"
//                 >
//                   {option.text}
//                 </button>
//               ))}
//             </div>
//           </>
//         ) : (
//           <>
//             <h2 className="text-2xl font-bold mb-4 text-center">
//               Your Recommended Career
//             </h2>

//             <p className="text-center text-lg text-blue-600 font-semibold">
//               {getResult()}
//             </p>

//             <p className="text-center text-gray-600 mt-4">
//               This result is based on your interests and preferences.
//             </p>

//             <button
//               onClick={() => {
//                 setCurrent(0);
//                 setAnswers([]);
//                 setShowResult(false);
//               }}
//               className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
//             >
//               Retake Quiz
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CareerQuiz;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function CareerQuiz() {
  const navigate = useNavigate();

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
    options: [
      "Tech Company",
      "Hospital",
      "Corporate Office",
      "Creative Studio",
    ],
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

  const [answers, setAnswers] = useState([]);

  const handleSelect = (questionId, option) => {
    setAnswers((prev) => {
      const filtered = prev.filter((a) => a.questionId !== questionId);
      return [...filtered, { questionId, answer: option }];
    });
  };

  const handleSubmit = async () => {
    try {
      await API.post("/quiz/submit", { answers });
      navigate("/dashboard");
    } catch (error) {
      alert("Error submitting quiz");
    }
  };

  return (
    <div className="pt-24 px-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Career Quiz</h1>

      {questions.map((q) => (
        <div key={q.id} className="mb-6 bg-white p-5 rounded shadow">
          <h2 className="font-semibold mb-3">{q.question}</h2>
          <div className="space-y-2">
            {q.options.map((option) => {
              const isSelected = answers.find(
                (a) => a.questionId === q.id && a.answer === option,
              );

              return (
                <button
                  key={option}
                  onClick={() => handleSelect(q.id, option)}
                  className={`block w-full text-left px-4 py-2 border rounded transition
        ${
          isSelected
            ? "bg-blue-600 text-white border-blue-600"
            : "hover:bg-blue-50"
        }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg"
      >
        Submit Quiz
      </button>
    </div>
  );
}

export default CareerQuiz;

