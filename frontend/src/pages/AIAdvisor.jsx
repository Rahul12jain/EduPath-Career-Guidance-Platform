import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import {
  FaRobot,
  FaArrowRight,
  FaCheckCircle,
  FaExclamationTriangle,
  FaChartLine,
  FaBullseye,
  FaRedo,
} from "react-icons/fa";

// Markdown renderer — converts AI markdown to JSX
function MarkdownRenderer({ content }) {
  const lines = content.split("\n");

  return (
    <div className="prose prose-sm max-w-none">
      {lines.map((line, i) => {
        // Headings
        if (line.startsWith("## ")) {
          return (
            <h2
              key={i}
              className="text-xl font-bold text-gray-900 mt-8 mb-3 flex items-center gap-2"
            >
              {line.replace("## ", "")}
            </h2>
          );
        }
        if (line.startsWith("### ")) {
          return (
            <h3
              key={i}
              className="text-lg font-semibold text-gray-800 mt-5 mb-2"
            >
              {line.replace("### ", "")}
            </h3>
          );
        }

        // Bullet points
        if (line.startsWith("- ")) {
          const text = line.replace("- ", "");
          return (
            <div key={i} className="flex items-start gap-2 mb-1.5 ml-2">
              <span className="text-blue-500 mt-1.5 text-xs">●</span>
              <span
                className="text-gray-700 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: text
                    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                    .replace(
                      /\[(.*?)\]\((.*?)\)/g,
                      '<a href="$2" target="_blank" class="text-blue-600 underline">$1</a>'
                    ),
                }}
              />
            </div>
          );
        }

        // Numbered lists
        if (/^\d+\.\s/.test(line)) {
          const text = line.replace(/^\d+\.\s/, "");
          return (
            <div key={i} className="flex items-start gap-2 mb-1.5 ml-2">
              <span className="text-blue-500 font-semibold text-sm min-w-[1.2rem]">
                {line.match(/^\d+/)[0]}.
              </span>
              <span
                className="text-gray-700 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: text.replace(
                    /\*\*(.*?)\*\*/g,
                    "<strong>$1</strong>"
                  ),
                }}
              />
            </div>
          );
        }

        // Horizontal rule
        if (line.startsWith("---")) {
          return <hr key={i} className="my-6 border-gray-200" />;
        }

        // Empty lines
        if (line.trim() === "") return <div key={i} className="h-2" />;

        // Regular paragraphs
        return (
          <p
            key={i}
            className="text-gray-700 text-sm leading-relaxed mb-2"
            dangerouslySetInnerHTML={{
              __html: line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
            }}
          />
        );
      })}
    </div>
  );
}

function AIAdvisor() {
  const [quizData, setQuizData] = useState(null);
  const [skillData, setSkillData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [advice, setAdvice] = useState(null);
  const [error, setError] = useState(null);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const resultRef = useRef(null);

  // Fetch user's existing data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [quizRes, skillRes] = await Promise.allSettled([
          API.get("/quiz/latest"),
          API.get("/skill/latest"),
        ]);

        if (quizRes.status === "fulfilled") setQuizData(quizRes.value.data);
        if (skillRes.status === "fulfilled") setSkillData(skillRes.value.data);
      } catch {
        // If both fail, that's fine — we'll show the empty state
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (!advice) return;

    setIsTyping(true);
    setDisplayedText("");
    let i = 0;
    const text = advice;
    const speed = 4; // chars per tick

    const timer = setInterval(() => {
      i += speed;
      if (i >= text.length) {
        setDisplayedText(text);
        setIsTyping(false);
        clearInterval(timer);
      } else {
        setDisplayedText(text.slice(0, i));
      }
    }, 10);

    return () => clearInterval(timer);
  }, [advice]);

  const generateAdvice = async () => {
    setGenerating(true);
    setError(null);
    setAdvice(null);

    try {
      const res = await API.post("/ai/career-advice");
      setAdvice(res.data.advice);

      // Scroll to result after a short delay
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to generate advice. Please try again."
      );
    } finally {
      setGenerating(false);
    }
  };

  const hasData = quizData || skillData;

  const skillLabels = {
    analytical: "Analytical",
    communication: "Communication",
    creativity: "Creativity",
    leadership: "Leadership",
    technical: "Technical",
    empathy: "Empathy",
    discipline: "Discipline",
    adaptability: "Adaptability",
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-500">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Loading your data...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <FaRobot />
            AI-Powered Guidance
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Career Advisor
            </span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Get a personalized 3-month action plan based on your quiz results
            and skill assessment. Powered by Google Gemini AI.
          </p>
        </div>

        {/* Data Summary — What the AI knows about you */}
        {hasData && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FaChartLine className="text-blue-500" />
              What the AI knows about you
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Quiz Data */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Career Quiz Results
                </h3>
                {quizData ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FaBullseye className="text-green-500 text-xs" />
                      <span className="text-sm text-gray-600">
                        Top Match:{" "}
                        <strong className="text-gray-900">
                          {quizData.careerSuggestion}
                        </strong>
                      </span>
                    </div>
                    {quizData.scoreBreakdown
                      ?.slice(0, 4)
                      .map((s, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-sm"
                        >
                          <div className="flex-1 bg-gray-100 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${s.percentage}%` }}
                            />
                          </div>
                          <span className="text-gray-500 w-20 text-xs">
                            {s.careerName}
                          </span>
                          <span className="text-gray-700 font-medium text-xs w-10 text-right">
                            {s.percentage}%
                          </span>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic">
                    Not taken yet —{" "}
                    <Link
                      to="/careerquiz"
                      className="text-blue-600 hover:underline"
                    >
                      Take Quiz
                    </Link>
                  </p>
                )}
              </div>

              {/* Skill Data */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Skill Assessment
                </h3>
                {skillData ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FaBullseye className="text-green-500 text-xs" />
                      <span className="text-sm text-gray-600">
                        Score:{" "}
                        <strong className="text-gray-900">
                          {skillData.averageScore}/5
                        </strong>{" "}
                        · Top:{" "}
                        <strong className="text-gray-900">
                          {skillData.topCareer?.title}
                        </strong>
                      </span>
                    </div>
                    {skillData.ratings &&
                      Object.entries(skillData.ratings).map(([key, val]) => (
                        <div
                          key={key}
                          className="flex items-center gap-2 text-sm"
                        >
                          <div className="flex-1 bg-gray-100 rounded-full h-2">
                            <div
                              className="bg-purple-500 h-2 rounded-full"
                              style={{ width: `${(val / 5) * 100}%` }}
                            />
                          </div>
                          <span className="text-gray-500 w-24 text-xs">
                            {skillLabels[key] || key}
                          </span>
                          <span className="text-gray-700 font-medium text-xs w-6 text-right">
                            {val}
                          </span>
                        </div>
                      ))}

                    {/* Strengths & Weaknesses chips */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {skillData.strengths?.map((s, i) => (
                        <span
                          key={i}
                          className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full"
                        >
                          ✓ {s}
                        </span>
                      ))}
                      {skillData.improvements?.map((s, i) => (
                        <span
                          key={i}
                          className="text-xs bg-yellow-50 text-yellow-600 px-2 py-0.5 rounded-full"
                        >
                          ↑ {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic">
                    Not taken yet —{" "}
                    <Link
                      to="/skill"
                      className="text-blue-600 hover:underline"
                    >
                      Take Assessment
                    </Link>
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Generate Button */}
        {!advice && (
          <div className="text-center mb-10">
            {!hasData ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 max-w-lg mx-auto">
                <FaExclamationTriangle className="text-yellow-500 text-3xl mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  No Data Available
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Take at least one assessment before the AI can generate your
                  personalized plan.
                </p>
                <div className="flex justify-center gap-3">
                  <Link
                    to="/careerquiz"
                    className="bg-purple-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-purple-700 transition text-sm"
                  >
                    Career Quiz
                  </Link>
                  <Link
                    to="/skill"
                    className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition text-sm"
                  >
                    Skill Assessment
                  </Link>
                </div>
              </div>
            ) : (
              <button
                onClick={generateAdvice}
                disabled={generating}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition shadow-lg inline-flex items-center gap-3 text-lg disabled:opacity-50"
              >
                {generating ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    AI is thinking...
                  </>
                ) : (
                  <>
                    <FaRobot />
                    Generate My Action Plan
                    <FaArrowRight />
                  </>
                )}
              </button>
            )}

            {/* Error */}
            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 max-w-lg mx-auto">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
          </div>
        )}

        {/* Loading Skeleton */}
        {generating && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <FaRobot className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  Generating your personalized plan...
                </p>
                <p className="text-xs text-gray-400">
                  This may take 10-15 seconds
                </p>
              </div>
            </div>
            <div className="space-y-4 animate-pulse">
              <div className="h-4 bg-gray-100 rounded w-3/4" />
              <div className="h-4 bg-gray-100 rounded w-full" />
              <div className="h-4 bg-gray-100 rounded w-5/6" />
              <div className="h-4 bg-gray-100 rounded w-2/3" />
              <div className="h-8 bg-gray-50 rounded mt-6" />
              <div className="h-4 bg-gray-100 rounded w-full" />
              <div className="h-4 bg-gray-100 rounded w-4/5" />
              <div className="h-4 bg-gray-100 rounded w-3/4" />
            </div>
          </div>
        )}

        {/* AI Response */}
        {advice && (
          <div ref={resultRef}>
            {/* Success Badge */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-4 py-1.5 rounded-full text-sm font-medium">
                <FaCheckCircle />
                Plan Generated Successfully
              </div>
            </div>

            {/* The AI Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <FaRobot className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    AI Career Advisor
                  </p>
                  <p className="text-xs text-gray-400">
                    Personalized for your profile · Powered by Gemini
                  </p>
                </div>

                {isTyping && (
                  <span className="ml-auto text-xs text-purple-500 bg-purple-50 px-3 py-1 rounded-full animate-pulse">
                    ✨ Writing...
                  </span>
                )}
              </div>

              <MarkdownRenderer content={displayedText} />

              {isTyping && (
                <span className="inline-block w-2 h-5 bg-purple-500 animate-pulse ml-0.5 rounded-sm" />
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => {
                  setAdvice(null);
                  setDisplayedText("");
                  generateAdvice();
                }}
                className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition text-sm"
              >
                <FaRedo />
                Regenerate Plan
              </button>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition text-sm"
              >
                Back to Dashboard
                <FaArrowRight />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AIAdvisor;
