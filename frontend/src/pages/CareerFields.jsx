import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { careerFields } from "../data/careerFields";

function CareerFields() {
  return (
    <section className="bg-gray-50 px-6 pt-12 pb-20 md:px-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
          Explore Career Fields
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Discover opportunities across different industries and open any field
          for courses, exams, scope, skills, and guidance.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {careerFields.slice(0, 6).map((field) => (
          <Link
            key={field.id}
            to={`/explorecareer/${field.id}`}
            className="group overflow-hidden rounded-lg bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <img
              src={field.image}
              alt={field.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-5">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {field.title}
                </h3>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600">
                  Details
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                {field.tagline}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                Learn more
                <FaArrowRight className="transition group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/explorecareer"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          View All Career Fields
          <FaArrowRight />
        </Link>
      </div>
    </section>
  );
}

export default CareerFields;
