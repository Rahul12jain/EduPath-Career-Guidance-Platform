function CareerFields() {
  return (
    <section className="px-6 md:px-16 pt-12 pb-20 bg-gray-50">
      {/* Section Heading */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Explore Career Fields
        </h2>
        <p className="mt-4 text-gray-600 text-lg">
          Discover opportunities across various industries and find the perfect
          match for your interests and skills.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475"
            alt="Technology"
            className="h-48 w-full object-cover"
          />
          <div className="p-5">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Technology</h3>
              <span className="text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                2.5M+ Jobs
              </span>
            </div>
            <p className="mt-3 text-gray-600 text-sm">
              Software Development, AI, Cybersecurity, Data Science
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3"
            alt="Healthcare"
            className="h-48 w-full object-cover"
          />
          <div className="p-5">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Healthcare</h3>
              <span className="text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                1.8M+ Jobs
              </span>
            </div>
            <p className="mt-3 text-gray-600 text-sm">
              Medicine, Nursing, Pharmacy, Medical Research
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
            alt="Business"
            className="h-48 w-full object-cover"
          />
          <div className="p-5">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Business</h3>
              <span className="text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                3.2M+ Jobs
              </span>
            </div>
            <p className="mt-3 text-gray-600 text-sm">
              Marketing, Finance, Management, Consulting
            </p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden">
          <img
            src="https://www.abacusinstitute.org/images/slider/slider_cse.jpg"
            alt="Engineering"
            className="h-48 w-full object-cover"
          />
          <div className="p-5">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Engineering</h3>
              <span className="text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                1.4M+ Jobs
              </span>
            </div>
            <p className="mt-3 text-gray-600 text-sm">
              Civil, Mechanical, Electrical, Chemical Engineering
            </p>
          </div>
        </div>

        {/* Card 5 */}
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            alt="Creative Arts"
            className="h-48 w-full object-cover"
          />
          <div className="p-5">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Creative Arts</h3>
              <span className="text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                950K+ Jobs
              </span>
            </div>
            <p className="mt-3 text-gray-600 text-sm">
              Design, Media, Animation, Digital Marketing
            </p>
          </div>
        </div>

        {/* Card 6 */}
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1529070538774-1843cb3265df"
            alt="Education"
            className="h-48 w-full object-cover"
          />
          <div className="p-5">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Education</h3>
              <span className="text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                1.2M+ Jobs
              </span>
            </div>
            <p className="mt-3 text-gray-600 text-sm">
              Teaching, Research, Training, Academic Development
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CareerFields;
