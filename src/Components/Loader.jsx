const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white dark:bg-gray-900">
      <div className="relative">
        <div className="flex space-x-2">
          <div className="w-20 h-28 bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 rounded-lg shadow-xl animate-[bounce_1s_ease-in-out_infinite] relative overflow-hidden">
            <div className="absolute top-2 left-2 w-4 h-4 bg-white dark:bg-gray-200 rounded-full opacity-50"></div>
            <div className="absolute bottom-2 right-2 w-6 h-1 bg-white dark:bg-gray-200 opacity-50"></div>
            <div className="absolute bottom-4 right-2 w-4 h-1 bg-white dark:bg-gray-200 opacity-50"></div>
          </div>
          <div className="w-20 h-28 bg-gradient-to-br from-purple-400 to-purple-600 dark:from-purple-500 dark:to-purple-700 rounded-lg shadow-xl animate-[bounce_1s_ease-in-out_0.2s_infinite] relative overflow-hidden">
            <div className="absolute top-2 left-2 w-4 h-4 bg-white dark:bg-gray-200 rounded-full opacity-50"></div>
            <div className="absolute bottom-2 right-2 w-6 h-1 bg-white dark:bg-gray-200 opacity-50"></div>
            <div className="absolute bottom-4 right-2 w-4 h-1 bg-white dark:bg-gray-200 opacity-50"></div>
          </div>
          <div className="w-20 h-28 bg-gradient-to-br from-[#476F97] to-[#324e69] dark:from-[#5a9bd5] dark:to-[#476F97] rounded-lg shadow-xl animate-[bounce_1s_ease-in-out_0.4s_infinite] relative overflow-hidden">
            <div className="absolute top-2 left-2 w-4 h-4 bg-white dark:bg-gray-200 rounded-full opacity-50"></div>
            <div className="absolute bottom-2 right-2 w-6 h-1 bg-white dark:bg-gray-200 opacity-50"></div>
            <div className="absolute bottom-4 right-2 w-4 h-1 bg-white dark:bg-gray-200 opacity-50"></div>
          </div>
        </div>

        <div className="flex justify-center items-center space-x-2 mt-8">
          <div className="w-3 h-3 bg-blue-500 dark:bg-blue-400 rounded-full animate-[pulse_1.5s_ease-in-out_infinite]"></div>
          <div className="w-3 h-3 bg-purple-500 dark:bg-purple-400 rounded-full animate-[pulse_1.5s_ease-in-out_0.3s_infinite]"></div>
          <div className="w-3 h-3 bg-[#476F97] dark:bg-[#5a9bd5] rounded-full animate-[pulse_1.5s_ease-in-out_0.6s_infinite]"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
