import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import logo from "../assets/EduPathLogo.png";

function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600";

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="EduPath" className="w-8 h-8" />
          <span className="text-xl font-bold text-blue-600">EduPath</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/skill" className={navLinkClass}>
            Skill Assessment
          </NavLink>
          <NavLink to="/careerquiz" className={navLinkClass}>
            Career Quiz
          </NavLink>
          <NavLink to="/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>

          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white border-t shadow">
          <div className="flex flex-col px-6 py-4 gap-4">
            <NavLink
              onClick={() => setOpen(false)}
              to="/"
              className={navLinkClass}
            >
              Home
            </NavLink>
            <NavLink
              onClick={() => setOpen(false)}
              to="/skill"
              className={navLinkClass}
            >
              Skill Assessment
            </NavLink>
            <NavLink
              onClick={() => setOpen(false)}
              to="/quiz"
              className={navLinkClass}
            >
              Career Quiz
            </NavLink>
            <NavLink
              onClick={() => setOpen(false)}
              to="/dashboard"
              className={navLinkClass}
            >
              Dashboard
            </NavLink>

            <Link
              onClick={() => setOpen(false)}
              to="/login"
              className="bg-blue-600 text-white text-center px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

