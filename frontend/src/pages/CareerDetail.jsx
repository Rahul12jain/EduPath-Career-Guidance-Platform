import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const CareerDetail = () => {
  const { id } = useParams();
  const [career, setCareer] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/careers/${id}`)
      .then((res) => setCareer(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!career) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{career.title}</h1>

      <p className="mb-6 text-gray-600">{career.overview}</p>

      <h2 className="text-xl font-semibold mb-2">Skills Required</h2>
      <ul className="list-disc ml-6 mb-6">
        {career.skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mb-2">Roadmap</h2>
      <ol className="list-decimal ml-6 mb-6">
        {career.roadmap.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>

      <div className="bg-gray-100 p-4 rounded">
        <p>
          <strong>Salary (India):</strong> {career.salaryRangeIndia}
        </p>
        <p>
          <strong>Growth Trend:</strong> {career.growthTrend}
        </p>
      </div>
    </div>
  );
};

export default CareerDetail;
