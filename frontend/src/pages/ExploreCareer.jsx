import { Link } from "react-router-dom";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import { careerFields } from "../data/careerFields";

function ExploreCareer() {
  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16">
      <section className="px-6 md:px-16">
        <div className="max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            <FaSearch />
            Career explorer
          </span>
          <h1 className="mt-5 text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
            Explore career fields and choose your next step with confidence
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-gray-600 md:text-lg">
            Compare popular fields like science, engineering, doctor,
            accounting, business, technology, law, and design. Open any field
            to understand scope, courses, entrance exams, required skills, job
            options, and practical guidance.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {careerFields.map((field) => (
            <Link
              key={field.id}
              to={`/explorecareer/${field.id}`}
              className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <img
                src={field.image}
                alt={field.title}
                className="h-44 w-full object-cover"
              />
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {field.title}
                  </h2>
                  <FaArrowRight className="mt-1 text-blue-600 transition group-hover:translate-x-1" />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {field.tagline}
                </p>
                <p className="mt-4 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700">
                  {field.jobs}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default ExploreCareer;
