import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import {
  FaClipboardCheck,
  FaQuestionCircle,
  FaCheckCircle,
  FaClock,
  FaArrowRight,
} from "react-icons/fa";

 

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [latestQuiz, setLatestQuiz] = useState(null);
  const [allQuizzes, setAllQuizzes] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await API.get("/auth/profile");
        setUser(data);
      } catch (error) {
        console.log("Failed to fetch user");
      }
    };

    fetchUser();
  }, []);

  
useEffect(() => {
  const fetchData = async () => {
    try {
      const userRes = await API.get("/auth/profile");
      setUser(userRes.data);

      const quizRes = await API.get("/quiz/latest");
      setLatestQuiz(quizRes.data);

      const allRes = await API.get("/quiz/all");
      setAllQuizzes(allRes.data);
    } catch (error) {
      console.log("Error loading dashboard data");
    }
  };

  fetchData();
}, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 px-6 py-10 pt-24">
      {/* Header */}
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600">
            Ready to continue your career journey with EduPath?
          </p>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="mt-4 sm:mt-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-lg font-medium hover:opacity-90 transition"
        >
          Logout
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<FaClipboardCheck />}
          title="Skills Assessed"
          value="12"
          sub="+3 this week"
          color="bg-blue-500"
        />
        <StatCard
          icon={<FaQuestionCircle />}
          title="Quizzes Completed"
          value="8"
          sub="+2 this week"
          color="bg-purple-500"
        />
        <StatCard
          icon={<FaCheckCircle />}
          title="Career Matches"
          value="15"
          sub="+5 new matches"
          color="bg-green-500"
        />
        <StatCard
          icon={<FaClock />}
          title="Learning Hours"
          value="24.5"
          sub="+8.2 hours"
          color="bg-orange-500"
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-6">
          {/* Career Progress */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-semibold mb-4">Career Progress Overview</h2>

            <div className="bg-blue-50 rounded-lg p-4 flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-gray-600">Current Level</p>
                <p className="font-medium">Intermediate Developer</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-blue-600">Level 3</p>
                <p className="text-xs text-gray-500">Next: Advanced</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Completion Rate</p>
                <p className="text-lg font-bold text-green-600">78%</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Streak Days</p>
                <p className="text-lg font-bold text-orange-600">12</p>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-semibold mb-4">Recent Activities</h2>

            <ActivityItem
              title="Completed Python Programming Quiz"
              time="2 hours ago"
            />
            <ActivityItem
              title="Updated Communication Skills Assessment"
              time="1 day ago"
            />
            <ActivityItem
              title="Explored Data Science Career Path"
              time="2 days ago"
            />
            <ActivityItem
              title="Joined Web Development Learning Track"
              time="3 days ago"
            />
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-semibold mb-4">Quick Actions</h2>

            <ActionButton
              text="Take Skills Assessment"
              color="bg-blue-50 text-blue-600"
            />
            <ActionButton
              text="Start Career Quiz"
              color="bg-purple-50 text-purple-600"
            />
            <ActionButton
              text="Browse Courses"
              color="bg-green-50 text-green-600"
            />
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-semibold mb-4">Personalized Recommendations</h2>

            {latestQuiz && latestQuiz.scoreBreakdown ? (
              <div>
                <h2 className="font-semibold mb-4">Your Career Matches</h2>

                {latestQuiz.scoreBreakdown
                  .filter((item) => item.percentage > 0) // Remove 0%
                  .slice(0, 3)
                  .map((item, index) => (
                    <div
                      key={index}
                      className={`mb-4 p-4 rounded-lg border ${
                        index === 0
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">
                          {item.career}
                          {index === 0 && (
                            <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
                              Top Match
                            </span>
                          )}
                        </span>
                        <span className="text-blue-600 font-semibold">
                          {item.percentage}%
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No quiz taken yet.</p>
            )}

            <div className="mt-6 text-center">
              <button
                onClick={() => navigate("/careerquiz")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition"
              >
                Retake Quiz
              </button>
            </div>
          </div>

          {/* Previous Attempts */}
          <div className="mt-10">
            <h2 className="text-lg font-semibold mb-6">Previous Attempts</h2>

            {allQuizzes.length === 0 ? (
              <div className="bg-white p-6 rounded-xl shadow-sm text-center text-gray-500">
                No previous attempts yet.
              </div>
            ) : (
              <div className="space-y-4">
                {allQuizzes.map((quiz) => {
                  const topMatch = quiz.scoreBreakdown?.[0];

                  return (
                    <div
                      key={quiz._id}
                      className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex justify-between items-center hover:shadow-md transition"
                    >
                      {/* LEFT SIDE */}
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-medium text-gray-800">
                            {quiz.careerSuggestion}
                          </h3>

                          {topMatch && (
                            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                              {topMatch.percentage}%
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-gray-500 mt-1">
                          Attempted on{" "}
                          {new Date(quiz.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </p>
                      </div>

                      {/* DELETE BUTTON */}
                      <button
                        onClick={async () => {
                          await API.delete(`/quiz/${quiz._id}`);
                          setAllQuizzes(
                            allQuizzes.filter((q) => q._id !== quiz._id),
                          );
                        }}
                        className="px-4 py-2 text-sm rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition"
                      >
                        Delete
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}

/* ---------- Reusable Components ---------- */

function StatCard({ icon, title, value, sub, color }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm flex justify-between items-center">
      <div>
        <div
          className={`w-10 h-10 ${color} text-white rounded-lg flex items-center justify-center mb-2`}
        >
          {icon}
        </div>
        <p className="text-sm text-gray-600">{title}</p>
      </div>
      <div className="text-right">
        <p className="text-xl font-bold">{value}</p>
        <p className="text-xs text-green-600">{sub}</p>
      </div>
    </div>
  );
}

function ActivityItem({ title, time }) {
  return (
    <div className="flex justify-between items-center py-3 border-b last:border-none">
      <div>
        <p className="font-medium text-sm">{title}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
      <FaArrowRight className="text-gray-400" />
    </div>
  );
}

function ActionButton({ text, color }) {
  return (
    <button className={`w-full text-left px-4 py-3 rounded-lg mb-3 ${color}`}>
      {text}
    </button>
  );
}

function Recommendation({ tag, title, desc, match }) {
  return (
    <div className="border rounded-lg p-4 mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-xs text-blue-600">{tag}</span>
        <span className="text-xs text-green-600">{match} match</span>
      </div>
      <p className="font-medium">{title}</p>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  );
}

export default Dashboard;
