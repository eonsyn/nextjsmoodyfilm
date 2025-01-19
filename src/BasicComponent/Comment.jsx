import React, { useEffect, useState } from "react";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const Comment = ({
  commentBy,
  userName,
  userProfile,
  review,
  likedBy,
  dislikedBy,
  createdAt,
  onLike,
  onDislike,
  onDelete, // Function to handle delete request
}) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);

  useEffect(() => {
    const isUserLoggedIn = () => {
      try {
        const user = JSON.parse(localStorage.getItem("MoodyfilmUser"));
        if (!user) {
          setIsLogin(false);
        } else {
          setUser(user);
          setIsLogin(true);

          // Check if the user has liked or disliked the review
          setHasLiked(likedBy.includes(user.id));
          setHasDisliked(dislikedBy.includes(user.id));
        }
      } catch (error) {
        console.error("Error retrieving user info:", error);
      }
    };

    isUserLoggedIn();
  }, [likedBy, dislikedBy]); // Re-run if the arrays change

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex items-start space-x-4 bg-white shadow-md rounded-lg p-4 mb-4 relative">
      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold text-lg">
        {userProfile}
      </div>
      <div className="flex-grow">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-gray-700">{userName}</span>
          <span className="text-xs text-gray-500">{formattedDate}</span>
        </div>
        <p className="mt-2 text-gray-800">{review}</p>
        <div className="flex items-center space-x-4 mt-2">
          <button
            onClick={onLike}
            className={`flex items-center ${
              hasLiked ? "text-blue-500" : "text-gray-600"
            } hover:text-blue-500`}
            disabled={!isLogin} // Disable button if not logged in
          >
            <FaThumbsUp className="mr-1" />
            <span>{likedBy.length}</span>
          </button>
          <button
            onClick={onDislike}
            className={`flex items-center ${
              hasDisliked ? "text-red-500" : "text-gray-600"
            } hover:text-red-500`}
            disabled={!isLogin} // Disable button if not logged in
          >
            <FaThumbsDown className="mr-1" />
            <span>{dislikedBy.length}</span>
          </button>
        </div>
      </div>

      {/* Show delete button if user is logged in and is the author */}
      {isLogin && user.id === commentBy && (
        <div className="absolute bottom-2 right-4 flex items-center justify-center">
          <MdDeleteForever
            className="h-5 w-5 cursor-pointer hover:text-red-600"
            onClick={onDelete} // Pass comment ID to onDelete function
          />
        </div>
      )}
    </div>
  );
};

export default Comment;
