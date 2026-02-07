// import { Link } from "react-router-dom";

// function Footer() {
//   return (
//     <footer className="bg-white border-t">
//       <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
//         {/* LEFT: Branding & Description */}
//         <div className="space-y-4">
//           <h2 className="text-2xl font-bold text-blue-600">EduPath</h2>
//           <p className="text-gray-600 leading-relaxed max-w-sm">
//             Your personalized career guidance platform helping students discover
//             their potential and navigate through different career fields with
//             confidence.
//           </p>

//           {/* Social Icons (simple placeholders) */}
//           <div className="flex gap-3 pt-2">
//             <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-blue-100 cursor-pointer">
//               f
//             </div>
//             <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-blue-100 cursor-pointer">
//               t
//             </div>
//             <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-blue-100 cursor-pointer">
//               in
//             </div>
//           </div>
//         </div>

//         {/* MIDDLE: Quick Links */}
//         <div>
//           <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//           <ul className="space-y-3 text-gray-600">
//             <li>
//               <Link to="/dashboard" className="hover:text-blue-600">
//                 Dashboard
//               </Link>
//             </li>
//             <li>
//               <Link to="/skill" className="hover:text-blue-600">
//                 Skills Assessment
//               </Link>
//             </li>
//             <li>
//               <Link to="/quiz" className="hover:text-blue-600">
//                 Career Quiz
//               </Link>
//             </li>
//             <li>
//               <Link to="/login" className="hover:text-blue-600">
//                 Login
//               </Link>
//             </li>
//             <li>
//               <Link to="/signup" className="hover:text-blue-600">
//                 Sign Up
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* RIGHT: Support */}
//         <div className="flex flex-col justify-between">
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Support</h3>
//             <ul className="space-y-3 text-gray-600">
//               <li>
//                 <Link to="/help" className="hover:text-blue-600">
//                   Help Center
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/contact" className="hover:text-blue-600">
//                   Contact Us
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/privacy-policy" className="hover:text-blue-600">
//                   Privacy Policy
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/terms" className="hover:text-blue-600">
//                   Terms of Service
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Bottom Right Badge */}
//           <div className="mt-8">
//             <span className="inline-block px-4 py-2 text-sm border rounded-lg text-gray-600">
//               Designed by EduPath Team
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Copyright */}
//       <div className="border-t text-center py-4 text-sm text-gray-500">
//         © {new Date().getFullYear()} EduPath. All rights reserved.
//       </div>
//     </footer>
//   );
// }

// export default Footer;

// // import { Link } from "react-router-dom";
// // import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
// // import logo from "../assets/logo.png";

// // function Footer() {
// //   return (
// //     <footer className="bg-white border-t">
// //       <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
// //         {/* LEFT: Branding */}
// //         <div className="space-y-4">
// //           {/* Logo + Name */}
// //           <div className="flex items-center gap-3">
// //             <img
// //               src={logo}
// //               alt="EduPath Logo"
// //               className="w-10 h-10 rounded-lg object-cover"
// //             />
// //             <h2 className="text-2xl font-bold text-blue-600">EduPath</h2>
// //           </div>

// //           <p className="text-gray-600 leading-relaxed max-w-sm">
// //             Your personalized career guidance platform helping students discover
// //             their potential and navigate through different career fields with
// //             confidence.
// //           </p>

// //           {/* Social Icons */}
// //           <div className="flex gap-3 pt-2">
// //             <a
// //               href="#"
// //               className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white transition"
// //             >
// //               <FaFacebookF size={14} />
// //             </a>

// //             <a
// //               href="#"
// //               className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white transition"
// //             >
// //               <FaTwitter size={14} />
// //             </a>

// //             <a
// //               href="#"
// //               className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white transition"
// //             >
// //               <FaLinkedinIn size={14} />
// //             </a>
// //           </div>
// //         </div>

// //         {/* MIDDLE: Quick Links */}
// //         <div>
// //           <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
// //           <ul className="space-y-3 text-gray-600">
// //             <li>
// //               <Link to="/dashboard" className="hover:text-blue-600">
// //                 Dashboard
// //               </Link>
// //             </li>
// //             <li>
// //               <Link to="/skill" className="hover:text-blue-600">
// //                 Skills Assessment
// //               </Link>
// //             </li>
// //             <li>
// //               <Link to="/quiz" className="hover:text-blue-600">
// //                 Career Quiz
// //               </Link>
// //             </li>
// //             <li>
// //               <Link to="/login" className="hover:text-blue-600">
// //                 Login
// //               </Link>
// //             </li>
// //             <li>
// //               <Link to="/signup" className="hover:text-blue-600">
// //                 Sign Up
// //               </Link>
// //             </li>
// //           </ul>
// //         </div>

// //         {/* RIGHT: Support */}
// //         <div className="flex flex-col justify-between">
// //           <div>
// //             <h3 className="text-lg font-semibold mb-4">Support</h3>
// //             <ul className="space-y-3 text-gray-600">
// //               <li>
// //                 <Link to="/help" className="hover:text-blue-600">
// //                   Help Center
// //                 </Link>
// //               </li>
// //               <li>
// //                 <Link to="/contact" className="hover:text-blue-600">
// //                   Contact Us
// //                 </Link>
// //               </li>
// //               <li>
// //                 <Link to="/privacy-policy" className="hover:text-blue-600">
// //                   Privacy Policy
// //                 </Link>
// //               </li>
// //               <li>
// //                 <Link to="/terms" className="hover:text-blue-600">
// //                   Terms of Service
// //                 </Link>
// //               </li>
// //             </ul>
// //           </div>

// //           {/* Badge */}
// //           <div className="mt-8">
// //             <span className="inline-block px-4 py-2 text-sm border rounded-lg text-gray-600">
// //               Designed by EduPath Team
// //             </span>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Bottom Bar */}
// //       <div className="border-t text-center py-12 text-sm text-gray-500">
// //         © {new Date().getFullYear()} EduPath. All rights reserved.
// //       </div>
// //     </footer>
// //   );
// // }

// // export default Footer;

import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import logo from "../assets/EduPathLogo.png";

function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        {/* COLUMN 1: EduPath */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="EduPath Logo"
              className="w-10 h-10 rounded-lg object-cover"
            />
            <h2 className="text-2xl font-bold text-blue-600">EduPath</h2>
          </div>

          <p className="text-gray-600 leading-relaxed max-w-sm">
            Your personalized career guidance platform helping students discover
            their potential and navigate different career paths with confidence.
          </p>

          <div className="flex gap-3 pt-2">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white transition"
            >
              <FaFacebookF size={14} />
            </a>

            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white transition"
            >
              <FaTwitter size={14} />
            </a>

            <a
              href="https://www.linkedin.com/in/rahul-jain-367450283/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white transition"
            >
              <FaLinkedinIn size={14} />
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-pink-600 hover:text-white transition"
            >
              <FaInstagram size={14} />
            </a>
          </div>
        </div>

        {/* COLUMN 2: Quick Links */}
        <div className="flex flex-col items-center text-center">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-gray-600">
            <li>
              <Link to="/dashboard" className="hover:text-blue-600">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/skill" className="hover:text-blue-600">
                Skills Assessment
              </Link>
            </li>
            <li>
              <Link to="/quiz" className="hover:text-blue-600">
                Career Quiz
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-blue-600">
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className="hover:text-blue-600">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>

        {/* COLUMN 3: Support */}
        <div className="flex flex-col items-center text-center">
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-3 text-gray-600">
            <li>
              <Link to="/help" className="hover:text-blue-600">
                Help Center
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-600">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-blue-600">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-blue-600">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t text-center py-8 text-sm text-gray-500">
        © {new Date().getFullYear()} EduPath. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

