import { useContext, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import {
  FaBus,
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
  FaTicketAlt,
  FaUser,
} from "react-icons/fa";
import toast from "react-hot-toast";

const Navbar = ({ theme, toggleTheme }) => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully");
      })
      .catch((error) => {
        toast.error("Logout failed");
      });
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/50"
                : "text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-600"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/all-ticket"
              className={({ isActive }) =>
                `px-5 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/50"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-600"
                }`
              }
            >
              All Tickets
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 transition-all duration-300">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <FaBus className="relative text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600" />
            </div>
            <span className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TicketBari
            </span>
          </Link>

          <ul className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks}
          </ul>

          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            {user ? (
              <div className="relative group">
                <button className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-50"></div>
                  <img
                    src={user.photoURL || "https://i.ibb.co/2Pz4LgR/user.png"}
                    alt={user.displayName}
                    className="relative w-11 h-11 rounded-full ring-2 ring-blue-500 dark:ring-purple-500 object-cover hover:ring-4 transition-all duration-300"
                  />
                </button>

                <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 -translate-y-2">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-t-2xl">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          user.photoURL || "https://i.ibb.co/2Pz4LgR/user.png"
                        }
                        alt={user.displayName}
                        className="w-12 h-12 rounded-full ring-2 ring-blue-500 dark:ring-purple-500 object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                          {user.displayName}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-300 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 space-y-1">
                    <Link
                      to="/dashboard/user/profile"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200 font-medium"
                    >
                      <FaUser className="text-blue-500" />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 font-medium"
                    >
                      <FaTimes className="text-red-500" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex space-x-3">
                <Link
                  to="/login"
                  className="px-6 py-2.5 rounded-xl font-semibold text-gray-700 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-3">
            {user && (
              <div className="relative group">
                <button className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-50"></div>
                  <img
                    src={user.photoURL || "https://i.ibb.co/2Pz4LgR/user.png"}
                    alt={user.displayName}
                    className="relative w-10 h-10 rounded-full ring-2 ring-blue-500 dark:ring-purple-500 object-cover"
                  />
                </button>

                <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 -translate-y-2 z-50">
                  <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-t-2xl">
                    <div className="flex items-center gap-2">
                      <img
                        src={
                          user.photoURL || "https://i.ibb.co/2Pz4LgR/user.png"
                        }
                        alt={user.displayName}
                        className="w-10 h-10 rounded-full ring-2 ring-blue-500 dark:ring-purple-500 object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-gray-900 dark:text-white truncate">
                          {user.displayName}
                        </p>
                        <p className="text-[10px] text-gray-600 dark:text-gray-300 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 space-y-1">
                    <Link
                      to="/dashboard/user/profile"
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-200 font-medium"
                    >
                      <FaUser className="text-blue-500 text-xs" />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 font-medium"
                    >
                      <FaTimes className="text-red-500 text-xs" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 rounded-xl bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-200 text-xl"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-6 space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4">
            <ul className="space-y-2">{navLinks}</ul>
            {!user && (
              <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link
                  to="/login"
                  className="block w-full px-4 py-3 rounded-xl text-center font-semibold text-gray-700 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block w-full px-4 py-3 rounded-xl text-center font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
