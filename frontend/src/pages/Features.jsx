function Features() {
  return (
    <section className="px-6 md:px-16 pt-12 pb-20 bg-white">
      {/* Section Heading */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Everything You Need for Career Success
        </h2>
        <p className="mt-4 text-gray-600 text-lg">
          Our comprehensive platform provides all the tools and guidance you
          need to make informed career decisions.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Card 1 */}
        <div className="border rounded-2xl p-6 hover:shadow-lg transition">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100 text-blue-600 mb-4">
            📊
          </div>
          <h3 className="text-xl font-semibold mb-2">Personal Dashboard</h3>
          <p className="text-gray-600">
            Track your career journey, view progress, and manage your learning
            path in one place.
          </p>
        </div>

        {/* Card 2 */}
        <div className="border rounded-2xl p-6 hover:shadow-lg transition">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100 text-blue-600 mb-4">
            🧠
          </div>
          <h3 className="text-xl font-semibold mb-2">Skills Assessment</h3>
          <p className="text-gray-600">
            Discover your strengths and identify areas for improvement with our
            comprehensive skills evaluation.
          </p>
        </div>

        {/* Card 3 */}
        <div className="border rounded-2xl p-6 hover:shadow-lg transition">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100 text-blue-600 mb-4">
            📝
          </div>
          <h3 className="text-xl font-semibold mb-2">Career Quiz</h3>
          <p className="text-gray-600">
            Take personalized quizzes to explore different career paths that
            match your interests and abilities.
          </p>
        </div>

        {/* Card 4 */}
        <div className="border rounded-2xl p-6 hover:shadow-lg transition">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100 text-blue-600 mb-4">
            🧭
          </div>
          <h3 className="text-xl font-semibold mb-2">Career Guidance</h3>
          <p className="text-gray-600">
            Get expert advice and recommendations tailored to your unique
            profile and career goals.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Features;
