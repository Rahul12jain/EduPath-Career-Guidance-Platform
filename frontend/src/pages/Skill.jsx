import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { careerFields } from "../data/careerFields";
import API from "../services/api";
import {
  FaChartLine,
  FaArrowRight,
  FaCheckCircle,
  FaExclamationTriangle,
  FaRedo,
} from "react-icons/fa";

// 8 universal skill categories that map across all careers
const skillCategories = [
  {
    id: "analytical",
    name: "Analytical Thinking",
    description: "Breaking down problems, data analysis, logical reasoning",
    icon: "🧠",
  },
  {
    id: "communication",
    name: "Communication",
    description: "Speaking, writing, presenting ideas clearly",
    icon: "🗣️",
  },
  {
    id: "creativity",
    name: "Creativity",
    description: "Generating ideas, design thinking, imagination",
    icon: "🎨",
  },
  {
    id: "leadership",
    name: "Leadership",
    description: "Decision making, team management, initiative",
    icon: "👑",
  },
  {
    id: "technical",
    name: "Technical Skills",
    description: "Programming, tools, domain-specific expertise",
    icon: "⚙️",
  },
  {
    id: "empathy",
    name: "Empathy & Patience",
    description: "Understanding others, patience, emotional awareness",
    icon: "💙",
  },
  {
    id: "discipline",
    name: "Discipline & Focus",
    description: "Consistency, attention to detail, time management",
    icon: "🎯",
  },
  {
    id: "adaptability",
    name: "Adaptability",
    description: "Learning new things, handling change, flexibility",
    icon: "🔄",
  },
];

// Which skills matter most for each career field (weights 0-1)
const careerSkillWeights = {
  science: { analytical: 0.95, communication: 0.5, creativity: 0.6, leadership: 0.3, technical: 0.7, empathy: 0.4, discipline: 0.9, adaptability: 0.6 },
  engineering: { analytical: 0.9, communication: 0.5, creativity: 0.5, leadership: 0.4, technical: 0.95, empathy: 0.3, discipline: 0.8, adaptability: 0.7 },
  doctor: { analytical: 0.7, communication: 0.7, creativity: 0.3, leadership: 0.5, technical: 0.6, empathy: 0.95, discipline: 0.9, adaptability: 0.6 },
  accounting: { analytical: 0.85, communication: 0.6, creativity: 0.3, leadership: 0.4, technical: 0.7, empathy: 0.3, discipline: 0.95, adaptability: 0.5 },
  business: { analytical: 0.6, communication: 0.9, creativity: 0.6, leadership: 0.95, technical: 0.4, empathy: 0.5, discipline: 0.7, adaptability: 0.8 },
  technology: { analytical: 0.85, communication: 0.4, creativity: 0.6, leadership: 0.3, technical: 0.95, empathy: 0.2, discipline: 0.8, adaptability: 0.9 },
  law: { analytical: 0.8, communication: 0.95, creativity: 0.4, leadership: 0.6, technical: 0.3, empathy: 0.5, discipline: 0.9, adaptability: 0.5 },
  "creative-arts": { analytical: 0.3, communication: 0.7, creativity: 0.95, leadership: 0.3, technical: 0.6, empathy: 0.5, discipline: 0.6, adaptability: 0.8 },
};

// Radar chart component using SVG
function RadarChart({ data, size = 300 }) {
  const canvasRef = useRef(null);
  const center = size / 2;
  const radius = size / 2 - 40;
  const levels = 5;
  const count = data.length;

  const getPoint = (index, value) => {
    const angle = (Math.PI * 2 * index) / count - Math.PI / 2;
    const r = (value / 5) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const gridLevels = Array.from({ length: levels }, (_, i) => i + 1);

  return (
    <svg width={size} height={size} className="mx-auto">
      {/* Grid circles */}
      {gridLevels.map((level) => {
        const points = Array.from({ length: count }, (_, i) => {
          const p = getPoint(i, level);
          return `${p.x},${p.y}`;
        }).join(" ");
        return (
          <polygon
            key={level}
            points={points}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        );
      })}

      {/* Axis lines */}
      {data.map((_, i) => {
        const p = getPoint(i, 5);
        return (
          <line
            key={`axis-${i}`}
            x1={center}
            y1={center}
            x2={p.x}
            y2={p.y}
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        );
      })}

      {/* Data polygon */}
      <polygon
        points={data
          .map((d, i) => {
            const p = getPoint(i, d.value);
            return `${p.x},${p.y}`;
          })
          .join(" ")}
        fill="rgba(59, 130, 246, 0.15)"
        stroke="#3b82f6"
        strokeWidth="2.5"
      />

      {/* Data points */}
      {data.map((d, i) => {
        const p = getPoint(i, d.value);
        return (
          <circle
            key={`point-${i}`}
            cx={p.x}
            cy={p.y}
            r="4"
            fill="#3b82f6"
            stroke="white"
            strokeWidth="2"
          />
        );
      })}

      {/* Labels */}
      {data.map((d, i) => {
        const p = getPoint(i, 5.8);
        return (
          <text
            key={`label-${i}`}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-gray-600 text-xs font-medium"
          >
            {d.shortName}
          </text>
        );
      })}
    </svg>
  );
}

function Skill() {
  const [step, setStep] = useState("assess"); // assess | results
  const [ratings, setRatings] = useState(
    Object.fromEntries(skillCategories.map((s) => [s.id, 3]))
  );
  const [results, setResults] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const isLoggedIn = !!localStorage.getItem("token");

  const handleRate = (skillId, value) => {
    setRatings({ ...ratings, [skillId]: value });
  };

  const calculateResults = async () => {
    // Calculate match score for each career
    const careerMatches = careerFields.map((field) => {
      const weights = careerSkillWeights[field.id];
      if (!weights) return { field, score: 0 };

      let totalWeightedScore = 0;
      let totalWeight = 0;

      Object.entries(weights).forEach(([skillId, weight]) => {
        const userRating = ratings[skillId] || 3;
        totalWeightedScore += (userRating / 5) * weight;
        totalWeight += weight;
      });

      const score = Math.round((totalWeightedScore / totalWeight) * 100);
      return { field, score };
    });

    careerMatches.sort((a, b) => b.score - a.score);

    // Gap analysis for top career
    const topCareer = careerMatches[0];
    const topWeights = careerSkillWeights[topCareer.field.id];

    const gaps = skillCategories
      .map((skill) => {
        const weight = topWeights[skill.id] || 0;
        const userRating = ratings[skill.id];
        const required = Math.round(weight * 5 * 10) / 10;
        const gap = required - userRating;
        return { skill, userRating, required, gap, weight };
      })
      .sort((a, b) => b.gap - a.gap);

    const strengths = gaps.filter((g) => g.gap <= 0 && g.weight >= 0.5);
    const improvements = gaps.filter((g) => g.gap > 0.5);

    setResults({ careerMatches, topCareer, gaps, strengths, improvements });
    setStep("results");
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Save to backend if logged in
    if (isLoggedIn) {
      setSaving(true);
      try {
        await API.post("/skill/submit", {
          ratings,
          averageScore: parseFloat(avgScore.toFixed(1)),
          topCareer: {
            fieldId: topCareer.field.id,
            title: topCareer.field.title,
            score: topCareer.score,
          },
          careerMatches: careerMatches.map((m) => ({
            fieldId: m.field.id,
            title: m.field.title,
            score: m.score,
          })),
          strengths: strengths.map((s) => s.skill.name),
          improvements: improvements.map((s) => s.skill.name),
        });
        setSaved(true);
      } catch (error) {
        console.error("Could not save skill assessment:", error?.response?.data || error);
      } finally {
        setSaving(false);
      }
    }
  };

  const resetAssessment = () => {
    setRatings(Object.fromEntries(skillCategories.map((s) => [s.id, 3])));
    setResults(null);
    setSaved(false);
    setStep("assess");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const radarData = skillCategories.map((s) => ({
    shortName: s.name.split(" ")[0],
    value: ratings[s.id],
  }));

  // Average skill score
  const avgScore =
    Object.values(ratings).reduce((a, b) => a + b, 0) /
    Object.values(ratings).length;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {step === "assess" && (
          <>
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                <FaChartLine />
                Skill Assessment
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                Rate Your Skills
              </h1>
              <p className="text-gray-500 max-w-lg mx-auto">
                Honestly rate yourself on each skill from 1 (beginner) to 5
                (expert). We'll match your profile to the best career paths.
              </p>
            </div>

            {/* Radar Chart Preview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
              <h2 className="font-semibold text-gray-900 text-center mb-2">
                Your Skill Profile
              </h2>
              <p className="text-sm text-gray-400 text-center mb-4">
                Updates live as you rate each skill below
              </p>
              <RadarChart data={radarData} size={320} />
              <p className="text-center text-sm text-gray-500 mt-2">
                Average:{" "}
                <span className="font-semibold text-blue-600">
                  {avgScore.toFixed(1)}
                </span>{" "}
                / 5
              </p>
            </div>

            {/* Skill Rating Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {skillCategories.map((skill) => (
                <div
                  key={skill.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-5"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-2xl">{skill.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {skill.name}
                      </h3>
                      <p className="text-xs text-gray-400">
                        {skill.description}
                      </p>
                    </div>
                  </div>

                  {/* Rating Buttons */}
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        key={val}
                        onClick={() => handleRate(skill.id, val)}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                          ratings[skill.id] === val
                            ? "bg-blue-600 text-white shadow-md scale-105"
                            : ratings[skill.id] > val
                              ? "bg-blue-100 text-blue-600"
                              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-between text-xs text-gray-400 mt-1.5 px-1">
                    <span>Beginner</span>
                    <span>Expert</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                onClick={calculateResults}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition shadow-lg inline-flex items-center gap-2"
              >
                Analyze My Skills
                <FaArrowRight />
              </button>
            </div>
          </>
        )}

        {step === "results" && results && (
          <>
            {/* Results Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                <FaCheckCircle />
                Assessment Complete
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                Your Skill Analysis
              </h1>
              <p className="text-gray-500">
                Based on your self-assessment, here's your career compatibility.
              </p>

              {/* Save Status */}
              {saving && (
                <p className="text-sm text-blue-500 mt-3 flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Saving results...
                </p>
              )}
              {saved && (
                <p className="text-sm text-green-600 mt-3 flex items-center justify-center gap-2">
                  <FaCheckCircle />
                  Results saved to your profile
                </p>
              )}
              {!isLoggedIn && !saving && (
                <p className="text-sm text-gray-400 mt-3">
                  <Link to="/login" className="text-blue-600 hover:underline">Log in</Link> to save your results
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* LEFT — Radar + Career Matches */}
              <div className="lg:col-span-2 space-y-6">
                {/* Radar Chart */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="font-semibold text-gray-900 mb-4">
                    Your Skill Radar
                  </h2>
                  <RadarChart data={radarData} size={320} />
                </div>

                {/* Career Matches */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="font-semibold text-gray-900 mb-5">
                    Career Field Compatibility
                  </h2>
                  <div className="space-y-4">
                    {results.careerMatches.map((match, i) => (
                      <div key={match.field.id} className="flex items-center gap-4">
                        <span className="text-sm font-semibold text-gray-400 w-5">
                          {i + 1}
                        </span>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1.5">
                            <Link
                              to={`/career/${match.field.id}`}
                              className="font-medium text-gray-800 hover:text-blue-600 transition flex items-center gap-2"
                            >
                              {match.field.title}
                              {i === 0 && (
                                <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">
                                  Best Match
                                </span>
                              )}
                            </Link>
                            <span
                              className={`text-sm font-semibold ${
                                match.score >= 70
                                  ? "text-green-600"
                                  : match.score >= 50
                                    ? "text-yellow-600"
                                    : "text-gray-400"
                              }`}
                            >
                              {match.score}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2.5">
                            <div
                              className={`h-2.5 rounded-full transition-all duration-700 ${
                                i === 0
                                  ? "bg-gradient-to-r from-blue-600 to-purple-600"
                                  : match.score >= 70
                                    ? "bg-green-400"
                                    : match.score >= 50
                                      ? "bg-yellow-400"
                                      : "bg-gray-300"
                              }`}
                              style={{ width: `${match.score}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT — Gap Analysis */}
              <div className="space-y-6">
                {/* Top Match Card */}
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white shadow-sm">
                  <p className="text-sm text-blue-200 mb-1">
                    Your #1 Career Match
                  </p>
                  <h3 className="text-xl font-bold mb-2">
                    {results.topCareer.field.title}
                  </h3>
                  <p className="text-3xl font-bold mb-2">
                    {results.topCareer.score}%
                  </p>
                  <p className="text-sm text-blue-100 leading-relaxed">
                    {results.topCareer.field.tagline}
                  </p>
                  <Link
                    to={`/career/${results.topCareer.field.id}`}
                    className="mt-4 w-full bg-white text-blue-700 px-4 py-2.5 rounded-lg font-medium hover:bg-blue-50 transition flex items-center justify-center gap-2"
                  >
                    Explore This Career
                    <FaArrowRight size={12} />
                  </Link>
                </div>

                {/* Strengths */}
                {results.strengths.length > 0 && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <FaCheckCircle className="text-green-500" />
                      Your Strengths
                    </h2>
                    <div className="space-y-3">
                      {results.strengths.map((s) => (
                        <div
                          key={s.skill.id}
                          className="flex items-center gap-3 p-3 bg-green-50 rounded-lg"
                        >
                          <span className="text-lg">{s.skill.icon}</span>
                          <div>
                            <p className="font-medium text-gray-800 text-sm">
                              {s.skill.name}
                            </p>
                            <p className="text-xs text-green-600">
                              You rated {s.userRating}/5 · Needed{" "}
                              {s.required.toFixed(1)}/5
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Areas to Improve */}
                {results.improvements.length > 0 && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <FaExclamationTriangle className="text-yellow-500" />
                      Areas to Improve
                    </h2>
                    <p className="text-xs text-gray-400 mb-3">
                      For "{results.topCareer.field.title}" career path
                    </p>
                    <div className="space-y-3">
                      {results.improvements.map((s) => (
                        <div
                          key={s.skill.id}
                          className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg"
                        >
                          <span className="text-lg">{s.skill.icon}</span>
                          <div className="flex-1">
                            <p className="font-medium text-gray-800 text-sm">
                              {s.skill.name}
                            </p>
                            <p className="text-xs text-yellow-700">
                              You rated {s.userRating}/5 · Needed{" "}
                              {s.required.toFixed(1)}/5
                            </p>
                            <div className="w-full bg-yellow-100 rounded-full h-1.5 mt-1.5">
                              <div
                                className="bg-yellow-500 h-1.5 rounded-full"
                                style={{
                                  width: `${(s.userRating / s.required) * 100}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Retake Button */}
                <button
                  onClick={resetAssessment}
                  className="w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-50 transition"
                >
                  <FaRedo size={12} />
                  Retake Assessment
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Skill;
