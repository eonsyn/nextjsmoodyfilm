"use client";
import { useSession } from "next-auth/react";
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
  const { data: session, status } = useSession();
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setUser(session.user);
      setIsLogin(true);

      setHasLiked(session.user.id && likedBy.includes(session.user.id));
      setHasDisliked(session.user.id && dislikedBy.includes(session.user.id));
    } else if (status === "unauthenticated") {
      setIsLogin(false);
      setUser(null);
    }
  }, [likedBy, dislikedBy, status, session]);

  return (
    <div className="bg-black/20 backdrop-blur-lg shadow-lg rounded-lg p-6 mb-5 flex items-start space-x-4 relative border border-gray-700">
      {/* User Avatar */}
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
        {userProfile}
      </div>

      {/* Comment Box */}
      <div className="flex-grow">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-white">{userName}</span>
          <span className="text-xs text-gray-400">
            {new Date(createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        <p className="mt-3 text-gray-300 text-base bg-gray-800/40 p-4 rounded-md border border-gray-600">
          {review}
        </p>

        {/* Interaction Buttons */}
        <div className="flex items-center space-x-4 mt-4">
          <button
            onClick={onLike}
            className={`flex items-center px-3 py-1 rounded-lg transition ${
              hasLiked
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-400 hover:bg-blue-600"
            }`}
            disabled={!isLogin}
          >
            <FaThumbsUp className="mr-2 text-lg" />
            <span>{likedBy.length}</span>
          </button>

          <button
            onClick={onDislike}
            className={`flex items-center px-3 py-1 rounded-lg transition ${
              hasDisliked
                ? "bg-red-500 text-white"
                : "bg-gray-700 text-gray-400 hover:bg-red-600"
            }`}
            disabled={!isLogin}
          >
            <FaThumbsDown className="mr-2 text-lg" />
            <span>{dislikedBy.length}</span>
          </button>
        </div>
      </div>

      {/* Delete Button */}
      {isLogin && user?.id === userId && (
        <button
          onClick={onDelete}
          className="absolute bottom-2 right-2 p-2 rounded-full bg-gray-800 hover:bg-red-600 transition text-gray-400 hover:text-white"
        >
          <MdDeleteForever className="text-2xl" />
        </button>
      )}
    </div>
  );
};

export default Comment;
