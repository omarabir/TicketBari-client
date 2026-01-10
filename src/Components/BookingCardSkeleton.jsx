const BookingCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-48 bg-gray-300 dark:bg-gray-700"></div>

      {/* Content Skeleton */}
      <div className="p-6 space-y-4">
        {/* Title & Status */}
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1 space-y-2">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
          <div className="h-8 w-24 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        </div>

        {/* Location */}
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>

        {/* Details */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
          </div>
          <div className="flex justify-between">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
          </div>
          <div className="flex justify-between">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-28"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-lg flex-1"></div>
          <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-lg flex-1"></div>
        </div>
      </div>
    </div>
  );
};

export default BookingCardSkeleton;
