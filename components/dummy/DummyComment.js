const CommentDummy = () => {
  return (
    <div className="bg-black/20 backdrop-blur-lg shadow-lg rounded-lg p-6 mb-5 flex items-start space-x-4 relative border border-gray-700 animate-pulse">
      {/* User Avatar Skeleton */}
      <div className="w-12 h-12 rounded-full bg-gray-700"></div>

      {/* Comment Box Skeleton */}
      <div className="flex-grow space-y-3">
        {/* Username & Date Skeleton */}
        <div className="flex items-center justify-between">
          <div className="w-24 h-4 bg-gray-700 rounded"></div>
          <div className="w-16 h-3 bg-gray-700 rounded"></div>
        </div>

        {/* Review Text Skeleton */}
        <div className="w-full h-16 bg-gray-700 rounded"></div>

        {/* Interaction Buttons Skeleton */}
        <div className="flex space-x-4 mt-4">
          <div className="w-12 h-6 bg-gray-700 rounded"></div>
          <div className="w-12 h-6 bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default CommentDummy;
