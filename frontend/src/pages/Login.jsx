import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi";
import loginImg from "../assets/login-illustration.jpg";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/login", formData);

      // Save token
      localStorage.setItem("token", data.token);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-24 pb-24">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* LEFT: FORM */}
        <div className="p-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <HiAcademicCap size={24} />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
          <p className="text-center text-gray-600 text-sm mt-1">
            Login to continue your journey
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              type="email"
              name="email"
              className="border rounded-lg px-3 py-2 w-full"
              placeholder="Email Address"
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              className="border rounded-lg px-3 py-2 w-full"
              placeholder="Password"
              onChange={handleChange}
              required
            />

            <div className="flex justify-between text-sm">
              <label className="flex gap-2">
                <input type="checkbox" /> Remember me
              </label>
              <Link to="/forgot-password" className="text-blue-600">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-lg font-semibold"
            >
              Login
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-sm text-gray-500">Or login with</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 border rounded-lg py-2 hover:border-red-500 hover:bg-red-50"
            >
              <FaGoogle className="text-red-500 text-lg" />
              <span className="font-medium">Google</span>
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-2 border rounded-lg py-2 hover:border-blue-600 hover:bg-blue-50"
            >
              <FaFacebookF className="text-blue-600 text-lg" />
              <span className="font-medium">Facebook</span>
            </button>
          </div>

          <p className="text-center text-sm mt-6">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 font-medium">
              Sign up
            </Link>
          </p>
        </div>

        {/* RIGHT: IMAGE */}
        <div className="hidden md:flex items-center justify-center bg-gray-100">
          <img
            src={loginImg}
            alt="Login illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;

