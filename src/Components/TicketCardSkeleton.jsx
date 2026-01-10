const TicketCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-pulse h-full">
      {/* Image Skeleton */}
      <div className="relative h-48 bg-gray-300 dark:bg-gray-700">
        <div className="absolute top-4 right-4 bg-gray-400 dark:bg-gray-600 w-20 h-6 rounded-full"></div>
      </div>

      {/* Content Skeleton */}
      <div className="p-6 flex flex-col gap-3">
        {/* Title Skeleton */}
        <div className="space-y-2">
          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
        </div>

        {/* Location Skeleton */}
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>

        {/* Transport Type Skeleton */}
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
        </div>

        {/* Price & Quantity Skeleton */}
        <div className="flex justify-between items-center">
          <div className="h-7 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
        </div>

        {/* Perks Skeleton */}
        <div className="flex gap-2">
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
        </div>

        {/* Button Skeleton */}
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-lg mt-2"></div>
      </div>
    </div>
  );
};

export default TicketCardSkeleton;
