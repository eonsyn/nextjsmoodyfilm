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
    <div className="shadow-lg bg-black/40 backdrop-blur-md my-8 rounded-xl p-5">
      <h2 className="text-xl text-white font-semibold mb-4">Write a Comment</h2>
      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        <textarea
          className="flex-grow bg-black/50 text-white border border-gray-600 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all duration-200"
          rows="2"
          placeholder="Share your thoughts..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
