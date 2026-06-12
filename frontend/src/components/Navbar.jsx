import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { FaUser, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";
import logo from "../assets/EduPathLogo.png";
import API from "../services/api";

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const token = localStorage.getItem("token");

  // Fetch user profile if logged in
  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }

    API.get("/auth/profile")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, [token]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setShowDropdown(false);
    setOpen(false);
    navigate("/login");
  };

  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const navLinkClass = ({ isActive }) =>
    isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600";

  const isLoggedIn = !!token && !!user;

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
          <NavLink to="/explorecareer" className={navLinkClass}>
            Explore Career
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

          {/* Login Button or Avatar */}
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all"
              >
                {getInitials(user.name)}
              </button>

              {/* Dropdown */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fadeIn">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
                        {getInitials(user.name)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    <Link
                      to="/dashboard"
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                    >
                      <FaTachometerAlt className="text-gray-400" />
                      Dashboard
                    </Link>
                    <Link
                      to="/careerquiz"
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                    >
                      <FaUser className="text-gray-400" />
                      Career Quiz
                    </Link>
                  </div>

                  {/* Logout */}
                  <div className="border-t border-gray-100 pt-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
                    >
                      <FaSignOutAlt />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-1 text-sm font-medium">
              <Link to="/login" className="hover:text-blue-200 transition">Login</Link>
              <span className="text-blue-300">/</span>
              <Link to="/signup" className="hover:text-blue-200 transition">Sign Up</Link>
            </div>
          )}
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
            <NavLink onClick={() => setOpen(false)} to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink onClick={() => setOpen(false)} to="/explorecareer" className={navLinkClass}>
              Explore Career
            </NavLink>
            <NavLink onClick={() => setOpen(false)} to="/skill" className={navLinkClass}>
              Skill Assessment
            </NavLink>
            <NavLink onClick={() => setOpen(false)} to="/careerquiz" className={navLinkClass}>
              Career Quiz
            </NavLink>
            <NavLink onClick={() => setOpen(false)} to="/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>

            {/* Mobile: User info or Login */}
            {isLoggedIn ? (
              <div className="border-t pt-4 mt-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
                    {getInitials(user.name)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 px-4 py-2.5 rounded-lg font-medium hover:bg-red-100 transition"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            ) : (
              <div className="bg-blue-600 text-white text-center px-4 py-2 rounded-lg flex items-center justify-center gap-1 text-sm font-medium">
                <Link onClick={() => setOpen(false)} to="/login" className="hover:text-blue-200 transition">Login</Link>
                <span className="text-blue-300">/</span>
                <Link onClick={() => setOpen(false)} to="/signup" className="hover:text-blue-200 transition">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
