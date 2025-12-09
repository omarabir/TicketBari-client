import { useState } from "react";

import { FaBus, FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink } from "react-router";

const Navbar = ({ theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg transition ${
              isActive
                ? "bg-primary text-white"
                : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/all-tickets"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg transition ${
              isActive
                ? "bg-primary text-white"
                : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`
          }
        >
          All Tickets
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
            <FaBus className="text-3xl text-primary" />
            <span className="text-2xl font-bold text-gray-800 dark:text-white">
              TicketBari
            </span>
          </Link>

          <ul className="hidden md:flex items-center space-x-2">{navLinks}</ul>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>

            <div className="flex space-x-2">
              <Link
                to="/login"
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-purple-600 transition"
              >
                Register
              </Link>
            </div>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-2xl text-gray-700 dark:text-gray-200"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <ul className="space-y-2">{navLinks}</ul>

            <div className="mt-4 space-y-2">
              <Link
                to="/login"
                className="block w-full px-4 py-2 bg-primary text-white text-center rounded-lg hover:bg-blue-600 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block w-full px-4 py-2 bg-secondary text-white text-center rounded-lg hover:bg-purple-600 transition"
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
