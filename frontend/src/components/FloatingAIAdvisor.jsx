import { Link, useLocation } from "react-router-dom";
import { FaRobot } from "react-icons/fa";

function FloatingAIAdvisor() {
  const { pathname } = useLocation();
  const isAdvisorPage = pathname === "/ai-advisor";

  return (
    <Link
      to="/ai-advisor"
      aria-label="Open AI Advisor"
      title="Open AI Advisor"
      className={`fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-xl shadow-purple-200 transition hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-200 md:bottom-7 md:right-7 md:h-16 md:w-16 ${
        isAdvisorPage ? "ring-4 ring-purple-200" : ""
      }`}
    >
      <FaRobot className="text-2xl md:text-3xl" />
      <span className="absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-xs font-medium text-white shadow-lg md:block">
        AI Advisor
      </span>
      <span className="absolute right-2 top-2 h-3 w-3 rounded-full border-2 border-white bg-green-400" />
    </Link>
  );
}

export default FloatingAIAdvisor;