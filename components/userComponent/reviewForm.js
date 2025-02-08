"use client";
import { useState } from "react";

const ReviewForm = ({ sendMessage }) => {
  const [review, setReview] = useState("");
  const [loading, setloading] = useState(false);
  const handleSubmit = async (e) => {
    setloading(true);
    e.preventDefault();
    // Send the review to the parent component
    await sendMessage(review);
    setReview(""); // Clear the form after submission
    setloading(false);
  };

  return (
    <div className="shadow-md bg-slate-400 my-8  rounded-lg p-4">
      <h2 className="text-lg text-white font-bold mb-4">Write a Comment</h2>
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <textarea
          className="flex-grow border border-gray-300 text-black rounded-full p-2 pl-4 focus:outline-none focus:ring focus:border-blue-500 resize-none"
          rows="1"
          placeholder="Write a comment..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
        >
          {loading ? "loading" : "Post"}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
