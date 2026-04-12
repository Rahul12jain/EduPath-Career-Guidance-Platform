import { Link, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaBookOpen,
  FaBriefcase,
  FaBullseye,
  FaClipboardList,
  FaGraduationCap,
  FaLightbulb,
} from "react-icons/fa";
import { careerFields, getCareerFieldById } from "../data/careerFields";

const CareerDetail = () => {
  const { id } = useParams();
  const career = getCareerFieldById(id);

  if (!career) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 pt-28 pb-16 md:px-16">
        <div className="mx-auto max-w-3xl rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">
            Career field not found
          </h1>
          <p className="mt-3 text-gray-600">
            This career field is not available yet. Explore the available
            fields and choose one to see full guidance.
          </p>
          <Link
            to="/explorecareer"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            <FaArrowLeft />
            Back to Explore Career
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      <section className="relative">
        <img
          src={career.image}
          alt={career.title}
          className="h-72 w-full object-cover md:h-96"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="px-6 pb-10 md:px-16">
            <Link
              to="/explorecareer"
              className="inline-flex items-center gap-2 rounded-lg bg-white/95 px-4 py-2 text-sm font-semibold text-gray-900 transition hover:bg-white"
            >
              <FaArrowLeft />
              Explore all fields
            </Link>
            <h1 className="mt-5 max-w-4xl text-3xl font-bold leading-tight text-white md:text-5xl">
              {career.title}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-gray-100 md:text-lg">
              {career.tagline}
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 md:px-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <InfoBlock icon={<FaBookOpen />} title="About This Field">
              <p>{career.overview}</p>
            </InfoBlock>

            <InfoBlock icon={<FaBullseye />} title="Scope and Opportunities">
              <p>{career.scope}</p>
            </InfoBlock>

            <InfoBlock icon={<FaGraduationCap />} title="How to Complete It">
              <ol className="space-y-3">
                {career.pathways.map((step) => (
                  <li key={step} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 flex-none rounded-full bg-blue-600" />
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </InfoBlock>

            <InfoBlock icon={<FaClipboardList />} title="Important Exams">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {career.exams.map((exam) => (
                  <div
                    key={exam}
                    className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-800"
                  >
                    {exam}
                  </div>
                ))}
              </div>
            </InfoBlock>

            <InfoBlock icon={<FaLightbulb />} title="Guidance for Students">
              <ul className="space-y-3">
                {career.guidance.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 flex-none rounded-full bg-green-600" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </InfoBlock>
          </div>

          <aside className="space-y-6">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900">
                <FaBriefcase className="text-blue-600" />
                Career Options
              </h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {career.careers.map((option) => (
                  <span
                    key={option}
                    className="rounded-full bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700"
                  >
                    {option}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">
                Skills Required
              </h2>
              <ul className="mt-5 space-y-3">
                {career.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-lg border border-gray-100 px-4 py-3 text-sm font-medium text-gray-700"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg bg-blue-600 p-6 text-white shadow-sm">
              <h2 className="text-xl font-semibold">Next best step</h2>
              <p className="mt-3 text-sm leading-6 text-blue-50">
                Shortlist 2-3 fields, compare exams and courses, then take the
                career quiz to match your interests with a practical direction.
              </p>
              <Link
                to="/careerquiz"
                className="mt-5 inline-block rounded-lg bg-white px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
              >
                Take Career Quiz
              </Link>
            </div>
          </aside>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">
            Explore More Fields
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {careerFields
              .filter((field) => field.id !== career.id)
              .slice(0, 4)
              .map((field) => (
                <Link
                  key={field.id}
                  to={`/explorecareer/${field.id}`}
                  className="rounded-lg border border-gray-200 bg-white p-4 font-semibold text-gray-800 shadow-sm transition hover:border-blue-300 hover:text-blue-700"
                >
                  {field.title}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
};

function InfoBlock({ icon, title, children }) {
  return (
    <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="flex items-center gap-3 text-xl font-semibold text-gray-900">
        <span className="text-blue-600">{icon}</span>
        {title}
      </h2>
      <div className="mt-4 leading-7 text-gray-600">{children}</div>
    </section>
  );
}

export default CareerDetail;
