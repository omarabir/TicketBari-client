import { useContext, useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Providers/AuthProvider";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import logo from "../assets/logo.png";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const avatarRef = useRef(null);

  useEffect(() => {
    if (!user) return;

    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/${user.email}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUserRole(res.data.role || "user");
      } catch {
        setUserRole("user");
      }
    };

    fetchUserRole();
  }, [user]);

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out");
        setIsAvatarOpen(false);
        setIsMenuOpen(false);
      })
      .catch(() => toast.error("Logout failed"));
  };

  useEffect(() => {
    const handleOutside = (e) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target)) {
        setIsAvatarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const linkClass = ({ isActive }) =>
    `px-4 py-2 font-medium transition ${
      isActive
        ? "text-[#1FA0D6] font-semibold"
        : "text-gray-700 hover:text-[#1FA0D6]"
    }`;

  const navLinks = (
    <>
      <NavLink to="/" className={linkClass}>
        Home
      </NavLink>
      {user && (
        <NavLink to="/all-ticket" className={linkClass}>
          All Tickets
        </NavLink>
      )}
      <NavLink to="/about" className={linkClass}>
        About
      </NavLink>
      <NavLink to="/contact" className={linkClass}>
        Contact
      </NavLink>
    </>
  );

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="TicketBari Logo" className="w-24 -mt-5" />
            <span className="text-2xl lg:text-3xl -mb-10 -ml-10 -mt-8 font-bold text-[#476F97] bg-clip-text">
              TicketBari
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">{navLinks}</div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />

            {user ? (
              <div ref={avatarRef} className="relative">
                <button onClick={() => setIsAvatarOpen(!isAvatarOpen)}>
                  <img
                    src={user.photoURL || "https://i.ibb.co/2Pz4LgR/user.png"}
                    className="w-10 h-10 rounded-full ring-2 ring-[#09335b]"
                  />
                </button>

                {isAvatarOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-4 border-b">
                      <p className="font-semibold">{user.displayName}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      <span className="inline-block mt-2 px-3 py-1 text-xs bg-[#09335b] text-white rounded-full capitalize">
                        {userRole}
                      </span>
                    </div>

                    <div className="p-2 space-y-1">
                      <Link
                        to={`/dashboard/${userRole}/profile`}
                        onClick={() => setIsAvatarOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100"
                      >
                        <FaUser /> Dashboard
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-50"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-5 py-2 rounded-xl bg-[#09335b] text-white"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-6 pt-4 space-y-4">
            <div className="flex flex-col gap-2">{navLinks}</div>

            {user ? (
              <div className="pt-4 border-t space-y-4">
                {/* Avatar Info (same feel as desktop) */}
                <div className="flex items-center gap-3 px-4">
                  <img
                    src={user.photoURL || "https://i.ibb.co/2Pz4LgR/user.png"}
                    className="w-12 h-12 rounded-full ring-2 ring-[#09335b]"
                  />
                  <div>
                    <p className="font-semibold leading-tight">
                      {user.displayName}
                    </p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <span className="inline-block mt-1 px-3 py-0.5 text-xs bg-[#09335b] text-white rounded-full capitalize">
                      {userRole}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Link
                    to={`/dashboard/${userRole}/profile`}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 rounded-lg hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block text-center py-3 rounded-xl bg-[#09335b] text-white"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
