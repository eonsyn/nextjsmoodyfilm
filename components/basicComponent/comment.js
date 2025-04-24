"use client";
import { useState, useEffect, useRef } from "react";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { MdClose, MdDeleteForever } from "react-icons/md";
import { useSession } from "next-auth/react";
import { useSwipeable } from "react-swipeable";

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
  onSwipeLeft,
  onSwipeRight,
}) => {
  const { data: session, status } = useSession();
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [showFullComment, setShowFullComment] = useState(false);
  const commentRef = useRef(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setUser(session.user);
      setIsLogin(true);
      setHasLiked(session.user.id && likedBy.includes(session.user.id));
      setHasDisliked(session.user.id && dislikedBy.includes(session.user.id));
    } else {
      setIsLogin(false);
      setUser(null);
    }
  }, [likedBy, dislikedBy, status, session]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (commentRef.current && !commentRef.current.contains(event.target)) {
        setShowFullComment(false);
      }
    };

    if (showFullComment) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFullComment]);

  const handlers = useSwipeable({
    onSwipedLeft: onSwipeLeft,
    onSwipedRight: onSwipeRight,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div
      {...handlers}
      className="relative bg-gray-800 shadow-lg rounded-lg p-5 w-full max-w-md flex flex-col space-y-3 border border-gray-700 overflow-hidden"
    >
      {/* User Avatar & Name */}
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
          {userProfile}
        </div>
        <div>
          <p className="text-white font-semibold">{userName}</p>
          <p className="text-xs text-gray-400">
            {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Comment Text */}
      <p className="text-gray-300 text-base bg-gray-700 p-4 rounded-md border border-gray-600">
        {review.length > 100 ? (
          <>
            {showFullComment ? (
              <div
                ref={commentRef}
                className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
              >
                <div className=" bg-gray-900 p-6 rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto text-white relative">
                  <button
                    onClick={() => setShowFullComment(false)}
                    className="sticky top-0 right-0 p-2 rounded-full bg-gray-800 hover:bg-red-600 transition"
                  >
                    <MdClose className="text-2xl" />
                  </button>
                  <p className="text-lg">{review}</p>
                </div>
              </div>
            ) : (
              <>
                {review.substring(0, 100)}...
                <button
                  className="text-blue-400 underline"
                  onClick={() => setShowFullComment(true)}
                >
                  Click here to see more
                </button>
              </>
            )}
          </>
        ) : (
          review
        )}
      </p>

      {/* Interaction Buttons */}
      <div className="flex items-center justify-between mt-2">
        <div className="flex space-x-4">
          <button
            onClick={onLike}
            className={`flex items-center px-3 py-1 rounded-lg transition ${
              hasLiked
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-400 hover:bg-blue-600"
            }`}
            disabled={!isLogin}
          >
            <FaThumbsUp className="mr-2" />
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
            <FaThumbsDown className="mr-2" />
            <span>{dislikedBy.length}</span>
          </button>
        </div>

        {isLogin && user?.id === userId && (
          <button
            onClick={onDelete}
            className="p-2 rounded-full bg-gray-800 hover:bg-red-600 transition text-gray-400 hover:text-white"
          >
            <MdDeleteForever className="text-2xl" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Comment;
