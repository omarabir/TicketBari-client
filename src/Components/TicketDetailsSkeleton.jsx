const TicketDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4 mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Back button skeleton */}
        <div className="mb-6 w-24 h-10 bg-gray-300 dark:bg-gray-700 rounded-xl animate-pulse"></div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image card skeleton */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
              <div className="relative">
                <div className="w-full h-96 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
                <div className="absolute top-4 right-4 w-16 h-16 bg-gray-400 dark:bg-gray-600 rounded-2xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="h-10 bg-gray-400 dark:bg-gray-600 rounded-lg mb-2 w-3/4 animate-pulse"></div>
                  <div className="h-6 bg-gray-400 dark:bg-gray-600 rounded-lg w-1/3 animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Journey route skeleton */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-lg mb-6 w-48 animate-pulse"></div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-16 mb-2 animate-pulse"></div>
                  <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
                </div>
                <div className="px-6">
                  <div className="w-16 h-1 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
                </div>
                <div className="flex-1 text-right">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-16 mb-2 ml-auto animate-pulse"></div>
                  <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-32 ml-auto animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Departure details skeleton */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-lg mb-6 w-56 animate-pulse"></div>
              <div className="grid md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-xl animate-pulse"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24 mb-2 animate-pulse"></div>
                      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description skeleton */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-lg mb-4 w-32 animate-pulse"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
              </div>
            </div>

            {/* Perks skeleton */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-lg mb-6 w-40 animate-pulse"></div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="h-12 bg-gray-300 dark:bg-gray-700 rounded-xl animate-pulse"
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price card skeleton */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 sticky top-24">
              <div className="text-center mb-6">
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-24 mx-auto mb-2 animate-pulse"></div>
                <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded w-32 mx-auto animate-pulse"></div>
              </div>
              <div className="space-y-4 mb-6">
                <div className="h-px bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-20 animate-pulse"></div>
                  </div>
                ))}
                <div className="h-px bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
              </div>
              <div className="h-14 bg-gray-300 dark:bg-gray-700 rounded-xl animate-pulse"></div>
            </div>

            {/* Vendor card skeleton */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-lg mb-6 w-48 animate-pulse"></div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-xl animate-pulse"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32 mb-2 animate-pulse"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-xl animate-pulse"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32 mb-2 animate-pulse"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-40 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailsSkeleton;
