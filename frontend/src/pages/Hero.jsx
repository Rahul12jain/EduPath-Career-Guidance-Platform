import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between gap-10 px-6 md:px-16 py-20 pb-12">
      {/* Left Content */}
      <div className="max-w-xl text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Discover the <span className="text-blue-600">Right Career</span>
          <br /> After Class 12
        </h1>

        <p className="mt-5 text-gray-600 text-lg">
          EduPath helps students explore careers, assess skills, and make
          informed decisions for a successful future.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <Link
            to="/quiz"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Take Career Quiz
          </Link>

          <Link
            to="/dashboard"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>

      {/* Right Illustration */}
      <div className="max-w-md">
        <img
          src="https://illustrations.popsy.co/blue/student-graduation.svg"
          alt="Career Guidance Illustration"
          className="w-full"
        />
      </div>
    </section>
  );
}

export default Hero;
