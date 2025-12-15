import { useContext, useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import axios from "axios";
import logo from "../assets/logo.png";
import {
  FaUser,
  FaTicketAlt,
  FaHistory,
  FaPlus,
  FaList,
  FaChartLine,
  FaUsers,
  FaBullhorn,
  FaBars,
  FaTimes,
  FaHome,
} from "react-icons/fa";
import { AuthContext } from "../Providers/AuthProvider";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [userRole, setUserRole] = useState("user");
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchUserRole();
  }, [user]);

  const fetchUserRole = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/${user.email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserRole(response.data.role || "user");
    } catch (error) {
      console.error("Error fetching user role:", error);
    } finally {
      setLoading(false);
    }
  };

  const userLinks = [
    { to: "/dashboard/user/profile", icon: <FaUser />, label: "User Profile" },
    {
      to: "/dashboard/user/bookings",
      icon: <FaTicketAlt />,
      label: "My Booked Tickets",
    },
    {
      to: "/dashboard/user/transactions",
      icon: <FaHistory />,
      label: "Transaction History",
    },
  ];

  const vendorLinks = [
    {
      to: "/dashboard/vendor/profile",
      icon: <FaUser />,
      label: "Vendor Profile",
    },
    {
      to: "/dashboard/vendor/add-ticket",
      icon: <FaPlus />,
      label: "Add Ticket",
    },
    {
      to: "/dashboard/vendor/my-tickets",
      icon: <FaList />,
      label: "My Added Tickets",
    },
    {
      to: "/dashboard/vendor/bookings",
      icon: <FaTicketAlt />,
      label: "Requested Bookings",
    },
    {
      to: "/dashboard/vendor/revenue",
      icon: <FaChartLine />,
      label: "Revenue Overview",
    },
  ];

  const adminLinks = [
    {
      to: "/dashboard/admin/profile",
      icon: <FaUser />,
      label: "Admin Profile",
    },
    {
      to: "/dashboard/admin/manage-tickets",
      icon: <FaList />,
      label: "Manage Tickets",
    },
    {
      to: "/dashboard/admin/manage-users",
      icon: <FaUsers />,
      label: "Manage Users",
    },
    {
      to: "/dashboard/admin/advertise",
      icon: <FaBullhorn />,
      label: "Advertise Tickets",
    },
  ];

  const getLinks = () => {
    if (userRole === "admin") return adminLinks;
    if (userRole === "vendor") return vendorLinks;
    return userLinks;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div>
      <nav className=" fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="container ">
          <div className="flex items-center h-20">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="TicketBari Logo" className="w-24 -mt-5" />
              <span className="text-2xl lg:text-3xl -mb-10 -ml-10 -mt-8 font-bold text-[#476F97] bg-clip-text">
                TicketBari
              </span>
            </Link>
          </div>
        </div>
      </nav>
      <div className=" bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="flex">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden fixed top-24 left-4 z-50 p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300"
          >
            {isSidebarOpen ? (
              <FaTimes className="text-xl" />
            ) : (
              <FaBars className="text-xl" />
            )}
          </button>

          <aside
            className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-white dark:bg-gray-800 shadow-2xl transform transition-all duration-500 ease-in-out ${
              isSidebarOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            } mt-20 lg:mt-20`}
          >
            <div className="h-full overflow-y-auto">
              <div className="p-6 bg-[linear-gradient(159deg,#377CBD_0%,#09335B_50%,#09335B_100%)]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                    <FaChartLine className="text-3xl text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Dashboard</h2>
                    <p className="text-blue-100 text-sm capitalize">
                      {userRole} Panel
                    </p>
                  </div>
                </div>
              </div>

              <nav className="p-4 space-y-2">
                {getLinks().map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-5 py-4 rounded-xl font-medium transition-all duration-300 group ${
                        isActive
                          ? "bg-[linear-gradient(159deg,#377CBD_0%,#09335B_50%,#09335B_100%)] text-white shadow-lg shadow-blue-500/50 scale-105"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-600 hover:scale-105 hover:shadow-md"
                      }`
                    }
                  >
                    <span
                      className={`text-xl transition-transform duration-300 group-hover:scale-110`}
                    >
                      {link.icon}
                    </span>
                    <span>{link.label}</span>
                  </NavLink>
                ))}
              </nav>

              <div className="p-4 mt-6 border-t border-gray-200 dark:border-gray-700">
                <Link
                  to="/"
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center justify-center space-x-3 px-5 py-4 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-600 rounded-xl transition-all duration-300 font-medium hover:scale-105 group"
                >
                  <FaHome className="text-xl group-hover:scale-110 transition-transform" />
                  <span>Back to Home</span>
                </Link>
              </div>
            </div>
          </aside>

          {isSidebarOpen && (
            <div
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30 mt-20 transition-all duration-500"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          <main className="flex-1 p-4 lg:p-8 mt-20 min-h-screen">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
