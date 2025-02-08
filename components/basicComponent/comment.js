"use client";
import { useEffect, useState } from "react";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const Comment = ({
  id,
  userId,
  userName,
  userProfile,
  review,
  likedBy = [],
  dislikedBy = [],
  createdAt,
  onLike,
  onDislike,
  onDelete,
}) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("MoodyfilmUser"));
      if (storedUser) {
        setUser(storedUser);
        setIsLogin(true);
        console.log(isLogin);
        setHasLiked(likedBy.includes(storedUser.id));
        setHasDisliked(dislikedBy.includes(storedUser.id));
      }
    } catch (error) {
      console.error("Error retrieving user info:", error);
    }
  }, [likedBy, dislikedBy]);

  return (
    <div className="flex text-black items-start space-x-4 bg-slate-400 shadow-md rounded-lg p-4 mb-4 relative">
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold text-lg">
        {userProfile}
      </div>

      <div className="flex-grow">
        <div className="flex items-center justify-between">
          <span className="text-xl text-blue-800 font-bold text-gray-700">
            {userName}
          </span>

          <span className="text-xs text-gray-500">
            {new Date(createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        <p className="mt-2   text-xl text-gray-800">{review}</p>

        <div className="flex text-white items-center space-x-4 mt-2">
          <button
            onClick={onLike}
            className={`flex items-center ${
              hasLiked ? "text-blue-500" : "text-gray-600"
            } hover:text-blue-500`}
            disabled={!isLogin}
          >
            <FaThumbsUp className="mr-1   text-2xl" />
            <span className="text-2xl">{likedBy.length}</span>
          </button>

          <button
            onClick={onDislike}
            className={`flex items-center ${
              hasDisliked ? "text-red-500" : "text-gray-600"
            } hover:text-red-500`}
            disabled={!isLogin}
          >
            <FaThumbsDown className="mr-1 text-2xl" />
            <span className="text-2xl">{dislikedBy.length}</span>
          </button>
        </div>
      </div>

      {isLogin && user?.id === userId && (
        <div className="absolute bottom-2 right-4 flex items-center justify-center">
          <MdDeleteForever
            className="h-5 text-2xl w-5 cursor-pointer hover:text-red-600"
            onClick={onDelete}
          />
        </div>
      )}
    </div>
  );
};

export default Comment;
