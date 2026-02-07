import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="w-full">
      <div className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-20 px-6 md:px-16">
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to Start Your Career Journey?
        </h2>

        <p className="mt-4 max-w-2xl mx-auto text-lg text-blue-100">
          Join thousands of students who have already discovered their perfect
          career path with EduPath.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/signup"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Create Free Account
          </Link>

          <Link
            to="/dashboard"
            className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
          >
            View Dashboard Demo
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CTA;
