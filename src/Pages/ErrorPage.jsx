import { FaHome, FaTicketAlt, FaExclamationTriangle } from "react-icons/fa";
import { Link, useRouteError } from "react-router";
import { Helmet } from "react-helmet-async";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <>
      <Helmet>
        <title>Page Not Found - TicketBari</title>
      </Helmet>
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 overflow-hidden">
        <div className="max-w-2xl w-full">
          {/* Animated Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-full">
                <FaExclamationTriangle className="w-12 h-12 text-white animate-bounce" />
              </div>
            </div>
          </div>

          {/* Error Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 text-center">
            <div className="mb-4">
              <h1 className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                {error?.status || "404"}
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4"></div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-3">
              Oops! Page Not Found
            </h2>

            <p className="text-gray-600 dark:text-gray-400 text-base mb-6 max-w-md mx-auto">
              {error?.statusText ||
                error?.message ||
                "The page you are looking for seems to have taken a different route. Let's get you back on track!"}
            </p>

            {/* Decorative Tickets */}
            <div className="flex justify-center gap-4 mb-6 opacity-20">
              <FaTicketAlt className="w-6 h-6 text-blue-500 transform rotate-12" />
              <FaTicketAlt className="w-6 h-6 text-purple-500 transform -rotate-12" />
              <FaTicketAlt className="w-6 h-6 text-blue-500 transform rotate-6" />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
              <Link
                to="/"
                className="group flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <FaHome className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span>Back to Homepage</span>
              </Link>

              <button
                onClick={() => window.history.back()}
                className="flex items-center justify-center space-x-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 font-semibold shadow hover:shadow-lg transform hover:scale-105"
              >
                <span>Go Back</span>
              </button>
            </div>

            {/* Help Text */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Need help? Contact our{" "}
                <Link
                  to="/contact"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                >
                  support team
                </Link>
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                Error Code: {error?.status || "404"} | TicketBari - Your Travel
                Partner
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
