import React, { useState } from "react";
import {
  FaBars,
  FaHistory,
  FaTicketAlt,
  FaUser,
  FaTimes,
  FaHome,
  FaChartLine,
} from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="flex">
        <button
          onClick={toggleSidebar}
          className="lg:hidden fixed top-24 left-4 z-50 p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300"
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>

        <aside
          className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-white dark:bg-gray-800 shadow-2xl mt-20 lg:mt-20 transform transition-all duration-500 ease-in-out ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="h-full overflow-y-auto">
            <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600">
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                <FaChartLine className="text-3xl" />
                Dashboard
              </h2>
              <p className="text-blue-100 text-sm">
                Manage your tickets & bookings
              </p>
            </div>

            <nav className="p-4 space-y-2">
              <NavLink
                to="/dashboard/user/profile"
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-5 py-4 rounded-xl font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/50 scale-105"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-600 hover:scale-105"
                  }`
                }
              >
                <FaUser className="text-xl" />
                <span>User Profile</span>
              </NavLink>

              <NavLink
                to="/dashboard/user/bookings"
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-5 py-4 rounded-xl font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/50 scale-105"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-600 hover:scale-105"
                  }`
                }
              >
                <FaTicketAlt className="text-xl" />
                <span>My Booked Tickets</span>
              </NavLink>

              <NavLink
                to="/dashboard/user/transactions"
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-5 py-4 rounded-xl font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/50 scale-105"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-600 hover:scale-105"
                  }`
                }
              >
                <FaHistory className="text-xl" />
                <span>Transaction History</span>
              </NavLink>
            </nav>

            <div className="p-4 mt-6 border-t border-gray-200 dark:border-gray-700">
              <Link
                to="/"
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center justify-center space-x-3 px-5 py-4 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-600 rounded-xl transition-all duration-300 font-medium hover:scale-105"
              >
                <FaHome className="text-xl" />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </aside>

        {isSidebarOpen && (
          <div
            onClick={toggleSidebar}
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30 mt-20 backdrop-blur-sm transition-all duration-500"
          />
        )}

        <main className="flex-1 p-4 lg:p-8 mt-20 min-h-screen">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 rounded-2xl shadow-2xl mb-8 text-white">
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                Welcome to Your Dashboard! 🎉
              </h1>
              <p className="text-blue-100 text-lg">
                Manage all your tickets and bookings in one place
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                      Total Bookings
                    </p>
                    <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
                      12
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-xl">
                    <FaTicketAlt className="text-3xl text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                      Active Tickets
                    </p>
                    <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
                      8
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 rounded-xl">
                    <FaChartLine className="text-3xl text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                      Total Spent
                    </p>
                    <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
                      ৳5,400
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-xl">
                    <FaHistory className="text-3xl text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
