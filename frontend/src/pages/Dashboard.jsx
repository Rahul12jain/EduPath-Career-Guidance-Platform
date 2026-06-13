import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import {
  FaQuestionCircle,
  FaTrophy,
  FaChartBar,
  FaClipboardCheck,
  FaArrowRight,
  FaTrash,
  FaRedo,
  FaCompass,
  FaPen,
} from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [latestQuiz, setLatestQuiz] = useState(null);
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [latestSkill, setLatestSkill] = useState(null);
  const [allSkills, setAllSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, quizRes, allRes, skillRes, allSkillRes] = await Promise.allSettled([
          API.get("/auth/profile"),
          API.get("/quiz/latest"),
          API.get("/quiz/all"),
          API.get("/skill/latest"),
          API.get("/skill/all"),
        ]);

        if (userRes.status === "fulfilled") setUser(userRes.value.data);
        if (quizRes.status === "fulfilled") setLatestQuiz(quizRes.value.data);
        if (allRes.status === "fulfilled") setAllQuizzes(allRes.value.data);
        if (skillRes.status === "fulfilled") setLatestSkill(skillRes.value.data);
        if (allSkillRes.status === "fulfilled") setAllSkills(allSkillRes.value.data);
      } catch {
        console.log("Error loading dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Derived dynamic stats
  const quizCount = allQuizzes.length;
  const topCareer = latestQuiz?.careerSuggestion || "—";
  const topPercentage = latestQuiz?.scoreBreakdown?.[0]?.percentage || 0;
  const uniqueCareers = new Set(
    allQuizzes.flatMap(
      (q) => q.scoreBreakdown?.filter((s) => s.percentage > 0).map((s) => s.careerName) || []
    )
  ).size;

  // Relative time helper
  const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 30) return `${days}d ago`;
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-24">
        <div className="text-center">
          <svg className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-3" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-gray-500 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 px-6 py-10 pt-24">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.name || "Student"}!
        </h1>
        <p className="text-gray-500 mt-1">
          {quizCount > 0
            ? `You've taken ${quizCount} quiz${quizCount > 1 ? "zes" : ""} so far. Keep exploring!`
            : "Take your first career quiz to get personalized results."}
        </p>
      </div>

      {/* Stats Cards — all dynamic */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
              <FaQuestionCircle />
            </div>
            <p className="text-sm text-gray-500">Quizzes Taken</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">{quizCount}</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
              <FaTrophy />
            </div>
            <p className="text-sm text-gray-500">Top Career Match</p>
          </div>
          <p className="text-xl font-bold text-gray-900 truncate">{topCareer}</p>
          {topPercentage > 0 && (
            <p className="text-sm text-blue-600 font-medium mt-1">{topPercentage}% match</p>
          )}
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
              <FaChartBar />
            </div>
            <p className="text-sm text-gray-500">Careers Explored</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">{uniqueCareers}</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
              <FaClipboardCheck />
            </div>
            <p className="text-sm text-gray-500">Skill Score</p>
          </div>
          {latestSkill ? (
            <>
              <p className="text-3xl font-bold text-gray-900">{latestSkill.averageScore}/5</p>
              <p className="text-sm text-orange-600 font-medium mt-1">{latestSkill.topCareer?.title}</p>
            </>
          ) : (
            <Link to="/skill" className="text-sm text-blue-600 hover:underline">Take assessment →</Link>
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT — Career Matches + History */}
        <div className="lg:col-span-2 space-y-6">
          {/* Latest Career Matches */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-gray-900">Your Career Matches</h2>
              {latestQuiz && (
                <span className="text-xs text-gray-400">
                  Last taken {timeAgo(latestQuiz.createdAt)}
                </span>
              )}
            </div>

            {latestQuiz && latestQuiz.scoreBreakdown ? (
              <div className="space-y-4">
                {latestQuiz.scoreBreakdown
                  .filter((item) => item.percentage > 0)
                  .map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="font-medium text-gray-800 flex items-center gap-2">
                            {item.careerName}
                            {index === 0 && (
                              <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">
                                Best Match
                              </span>
                            )}
                          </span>
                          <span className="text-sm font-semibold text-gray-600">
                            {item.percentage}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2.5">
                          <div
                            className={`h-2.5 rounded-full transition-all duration-700 ${
                              index === 0
                                ? "bg-gradient-to-r from-blue-600 to-purple-600"
                                : index === 1
                                  ? "bg-blue-400"
                                  : index === 2
                                    ? "bg-blue-300"
                                    : "bg-gray-300"
                            }`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FaCompass className="text-4xl text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No quiz results yet</p>
                <p className="text-sm text-gray-400 mt-1">
                  Take the career quiz to discover your best career matches.
                </p>
                <button
                  onClick={() => navigate("/careerquiz")}
                  className="mt-4 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Take Career Quiz
                </button>
              </div>
            )}
          </div>

          {/* Quiz History — built from real data */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-semibold text-gray-900 mb-5">Quiz History</h2>

            {allQuizzes.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">
                Your quiz attempts will appear here.
              </p>
            ) : (
              <div className="space-y-3">
                {allQuizzes.map((quiz, idx) => {
                  const topMatch = quiz.scoreBreakdown?.[0];
                  return (
                    <div
                      key={quiz._id}
                      className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-semibold text-gray-500">
                          {allQuizzes.length - idx}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            {quiz.careerSuggestion}
                          </p>
                          <p className="text-xs text-gray-400">
                            {new Date(quiz.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                            {" · "}
                            {timeAgo(quiz.createdAt)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {topMatch && (
                          <span className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full font-medium">
                            {topMatch.percentage}%
                          </span>
                        )}
                        <button
                          onClick={() => {
                            setSelectedQuizId(quiz._id);
                            setShowConfirm(true);
                          }}
                          className="text-gray-300 hover:text-red-500 transition"
                          title="Delete"
                        >
                          <FaTrash size={13} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Skill Assessment Progress */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-gray-900">Skill Assessment Progress</h2>
              <Link to="/skill" className="text-sm text-blue-600 hover:underline">
                {allSkills.length > 0 ? "Retake →" : "Take Assessment →"}
              </Link>
            </div>

            {allSkills.length === 0 ? (
              <div className="text-center py-8">
                <FaClipboardCheck className="text-4xl text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No skill data yet</p>
                <p className="text-sm text-gray-400 mt-1">
                  Take the skill assessment to see your strengths, weaknesses, and track your progress over time.
                </p>
                <Link
                  to="/skill"
                  className="mt-4 inline-block bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Take Skill Assessment
                </Link>
              </div>
            ) : (
              /* Latest vs Previous Comparison */
              (() => {
                const latest = allSkills[0];
                const previous = allSkills.length > 1 ? allSkills[1] : null;
                const scoreDiff = previous ? (latest.averageScore - previous.averageScore).toFixed(1) : null;

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

                return (
                  <>
                    {/* Score Overview */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                      <div className="bg-blue-50 rounded-lg p-4 text-center">
                        <p className="text-sm text-gray-500 mb-1">Current Score</p>
                        <p className="text-2xl font-bold text-blue-600">{latest.averageScore}/5</p>
                        {scoreDiff && (
                          <p className={`text-xs font-medium mt-1 ${parseFloat(scoreDiff) >= 0 ? "text-green-600" : "text-red-500"}`}>
                            {parseFloat(scoreDiff) >= 0 ? "↑" : "↓"} {Math.abs(parseFloat(scoreDiff))} from previous
                          </p>
                        )}
                      </div>
                      <div className="bg-green-50 rounded-lg p-4 text-center">
                        <p className="text-sm text-gray-500 mb-1">Strengths</p>
                        <p className="text-2xl font-bold text-green-600">{latest.strengths?.length || 0}</p>
                        <p className="text-xs text-gray-400 mt-1">skills strong</p>
                      </div>
                      <div className="bg-yellow-50 rounded-lg p-4 text-center">
                        <p className="text-sm text-gray-500 mb-1">To Improve</p>
                        <p className="text-2xl font-bold text-yellow-600">{latest.improvements?.length || 0}</p>
                        <p className="text-xs text-gray-400 mt-1">skills to work on</p>
                      </div>
                    </div>

                    {/* Per-Skill Bars with Change */}
                    {latest.ratings && (
                      <div className="mb-6">
                        <h3 className="text-sm font-medium text-gray-700 mb-3">Skill Breakdown</h3>
                        <div className="space-y-3">
                          {Object.entries(latest.ratings).map(([key, val]) => {
                            const prevVal = previous?.ratings?.[key];
                            const diff = prevVal != null ? val - prevVal : null;
                            return (
                              <div key={key} className="flex items-center gap-3">
                                <span className="text-xs text-gray-500 w-24 shrink-0">{skillLabels[key] || key}</span>
                                <div className="flex-1 bg-gray-100 rounded-full h-2.5">
                                  <div
                                    className="bg-blue-500 h-2.5 rounded-full transition-all"
                                    style={{ width: `${(val / 5) * 100}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs font-semibold text-gray-700 w-6 text-right">{val}</span>
                                {diff !== null && diff !== 0 && (
                                  <span className={`text-xs font-medium w-8 ${diff > 0 ? "text-green-600" : "text-red-500"}`}>
                                    {diff > 0 ? `+${diff}` : diff}
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Strengths & Weaknesses */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      {latest.strengths?.length > 0 && (
                        <div className="bg-green-50 rounded-lg p-4">
                          <h3 className="text-sm font-semibold text-green-700 mb-2">✅ Strengths</h3>
                          <div className="flex flex-wrap gap-2">
                            {latest.strengths.map((s, i) => (
                              <span key={i} className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full">{s}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      {latest.improvements?.length > 0 && (
                        <div className="bg-yellow-50 rounded-lg p-4">
                          <h3 className="text-sm font-semibold text-yellow-700 mb-2">⚠️ Areas to Improve</h3>
                          <div className="flex flex-wrap gap-2">
                            {latest.improvements.map((s, i) => (
                              <span key={i} className="text-xs bg-yellow-100 text-yellow-700 px-2.5 py-1 rounded-full">{s}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Assessment History */}
                    {allSkills.length > 1 && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-3">Assessment History</h3>
                        <div className="space-y-2">
                          {allSkills.map((skill, idx) => {
                            const prev = allSkills[idx + 1];
                            const diff = prev ? (skill.averageScore - prev.averageScore).toFixed(1) : null;
                            return (
                              <div key={skill._id} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
                                <div className="flex items-center gap-3">
                                  <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center text-xs font-semibold text-gray-500">
                                    {allSkills.length - idx}
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-800">{skill.topCareer?.title}</p>
                                    <p className="text-xs text-gray-400">
                                      {new Date(skill.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                      {" · "}{timeAgo(skill.createdAt)}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-semibold text-gray-700">{skill.averageScore}/5</span>
                                  {diff !== null && (
                                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${parseFloat(diff) > 0 ? "bg-green-50 text-green-600" : parseFloat(diff) < 0 ? "bg-red-50 text-red-500" : "bg-gray-50 text-gray-400"}`}>
                                      {parseFloat(diff) > 0 ? `↑${diff}` : parseFloat(diff) < 0 ? `↓${Math.abs(parseFloat(diff))}` : "="}
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </>
                );
              })()
            )}
          </div>
        </div>

        {/* RIGHT — Actions */}
        <div className="space-y-6">
          {/* Quick Actions — all functional */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-semibold text-gray-900 mb-4">Quick Actions</h2>

            <Link
              to="/careerquiz"
              className="flex items-center justify-between w-full px-4 py-3.5 rounded-lg mb-3 bg-purple-50 text-purple-700 hover:bg-purple-100 transition"
            >
              <span className="flex items-center gap-2 font-medium">
                <FaPen size={13} />
                {quizCount > 0 ? "Retake Career Quiz" : "Take Career Quiz"}
              </span>
              <FaArrowRight size={12} />
            </Link>

            <Link
              to="/explorecareer"
              className="flex items-center justify-between w-full px-4 py-3.5 rounded-lg mb-3 bg-blue-50 text-blue-700 hover:bg-blue-100 transition"
            >
              <span className="flex items-center gap-2 font-medium">
                <FaCompass size={13} />
                Explore Careers
              </span>
              <FaArrowRight size={12} />
            </Link>

            <Link
              to="/skill"
              className="flex items-center justify-between w-full px-4 py-3.5 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition"
            >
              <span className="flex items-center gap-2 font-medium">
                <FaChartBar size={13} />
                Skills Assessment
              </span>
              <FaArrowRight size={12} />
            </Link>
          </div>

          {/* Retake CTA */}
          {latestQuiz && (
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white shadow-sm">
              <h3 className="font-semibold text-lg">Improve Your Results</h3>
              <p className="text-sm text-blue-100 mt-2 leading-relaxed">
                Retake the quiz as your interests evolve. Your new results will
                be saved alongside your previous attempts.
              </p>
              <button
                onClick={() => navigate("/careerquiz")}
                className="mt-4 w-full bg-white text-blue-700 px-4 py-2.5 rounded-lg font-medium hover:bg-blue-50 transition flex items-center justify-center gap-2"
              >
                <FaRedo size={12} />
                Retake Quiz
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-80 shadow-lg">
            <h3 className="text-lg font-semibold mb-3">Delete this attempt?</h3>

            <p className="text-sm text-gray-600 mb-6">
              This will permanently remove this quiz result.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  await API.delete(`/quiz/${selectedQuizId}`);
                  const updated = allQuizzes.filter((q) => q._id !== selectedQuizId);
                  setAllQuizzes(updated);

                  // If we deleted the latest quiz, update latestQuiz too
                  if (latestQuiz?._id === selectedQuizId) {
                    setLatestQuiz(updated.length > 0 ? updated[0] : null);
                  }

                  setShowConfirm(false);
                }}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
