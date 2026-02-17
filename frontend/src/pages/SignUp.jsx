// import { Link } from "react-router-dom";
// import { FaGoogle, FaFacebookF } from "react-icons/fa";
// import { HiAcademicCap } from "react-icons/hi";
// import signupImg from "../assets/signup-illustration.jpg";

// function SignUp() {
//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-24 pb-24">
//       <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
//         {/* LEFT: FORM */}
//         <div className="p-8">
//           <div className="flex justify-center mb-4">
//             <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">
//               <HiAcademicCap size={24} />
//             </div>
//           </div>

//           <h2 className="text-2xl font-bold text-center">Create Account</h2>
//           <p className="text-center text-gray-600 text-sm mt-1">
//             Start your career journey with EduPath
//           </p>

//           <form className="mt-6 space-y-4">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//               <input
//                 className="border rounded-lg px-3 py-2"
//                 placeholder="First Name"
//               />
//               <input
//                 className="border rounded-lg px-3 py-2"
//                 placeholder="Last Name"
//               />
//             </div>

//             <input
//               className="border rounded-lg px-3 py-2 w-full"
//               placeholder="Email Address"
//             />
//             <input
//               type="password"
//               className="border rounded-lg px-3 py-2 w-full"
//               placeholder="Password"
//             />
//             <input
//               type="password"
//               className="border rounded-lg px-3 py-2 w-full"
//               placeholder="Confirm Password"
//             />

//             <label className="flex gap-2 text-sm text-gray-600">
//               <input type="checkbox" /> I agree to Terms & Privacy Policy
//             </label>

//             <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-lg font-semibold">
//               Create Account
//             </button>
//           </form>

//           <div className="flex items-center my-6">
//             <div className="flex-1 h-px bg-gray-300"></div>
//             <span className="px-3 text-sm text-gray-500">Or sign up with</span>
//             <div className="flex-1 h-px bg-gray-300"></div>
//           </div>

//           <div className="grid grid-cols-2 gap-3">
//             {/* Google */}
//             <button
//               type="button"
//               className="flex items-center justify-center gap-2 border rounded-lg py-2 hover:border-red-500 hover:bg-red-50"
//             >
//               <FaGoogle className="text-red-500 text-lg" />
//               <span className="font-medium">Google</span>
//             </button>

//             {/* Facebook */}
//             <button
//               type="button"
//               className="flex items-center justify-center gap-2 border rounded-lg py-2 hover:border-blue-600 hover:bg-blue-50"
//             >
//               <FaFacebookF className="text-blue-600 text-lg" />
//               <span className="font-medium">Facebook</span>
//             </button>
//           </div>

//           <p className="text-center text-sm mt-6">
//             Already have an account?{" "}
//             <Link to="/login" className="text-blue-600 font-medium">
//               Sign in
//             </Link>
//           </p>
//         </div>

//         {/* RIGHT: IMAGE */}
//         <div className="hidden md:flex items-center justify-center bg-gray-100">
//           <img
//             src={signupImg}
//             alt="Signup illustration"
//             className="w-full h-full object-cover"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignUp;

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi";
import signupImg from "../assets/signup-illustration.jpg";
import API from "../services/api";

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.placeholder.includes("First")
        ? "firstName"
        : e.target.placeholder.includes("Last")
          ? "lastName"
          : e.target.placeholder.includes("Email")
            ? "email"
            : e.target.placeholder.includes("Confirm")
              ? "confirmPassword"
              : "password"]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const { data } = await API.post("/auth/register", {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
      });

      // Save token
      localStorage.setItem("token", data.token);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
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

          <h2 className="text-2xl font-bold text-center">Create Account</h2>
          <p className="text-center text-gray-600 text-sm mt-1">
            Start your career journey with EduPath
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                className="border rounded-lg px-3 py-2"
                placeholder="First Name"
                onChange={handleChange}
                required
              />
              <input
                className="border rounded-lg px-3 py-2"
                placeholder="Last Name"
                onChange={handleChange}
                required
              />
            </div>

            <input
              className="border rounded-lg px-3 py-2 w-full"
              placeholder="Email Address"
              type="email"
              onChange={handleChange}
              required
            />

            <input
              type="password"
              className="border rounded-lg px-3 py-2 w-full"
              placeholder="Password"
              onChange={handleChange}
              required
            />

            <input
              type="password"
              className="border rounded-lg px-3 py-2 w-full"
              placeholder="Confirm Password"
              onChange={handleChange}
              required
            />

            <label className="flex gap-2 text-sm text-gray-600">
              <input type="checkbox" required />I agree to Terms & Privacy
              Policy
            </label>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-lg font-semibold"
            >
              Create Account
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-sm text-gray-500">Or sign up with</span>
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
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium">
              Sign in
            </Link>
          </p>
        </div>

        {/* RIGHT: IMAGE */}
        <div className="hidden md:flex items-center justify-center bg-gray-100">
          <img
            src={signupImg}
            alt="Signup illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default SignUp;

