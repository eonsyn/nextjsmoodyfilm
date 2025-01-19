import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
const ReviewForm = ({ filmId }) => {
  const [review, setReview] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Clear previous messages
      setMessage("");
      setError("");

      // Validate input
      if (!review.trim()) {
        setError("Review cannot be empty.");
        return;
      }

      // Prepare the payload
      const payload = {
        filmId,
        review,
      };

      // Make API request
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/sendReview`,
        payload,
        {
          withCredentials: true,
        }
      );

      // Handle success
      setMessage(response.data.message);
      toast.success("comment successfully ");
      setReview(""); // Reset the form
    } catch (err) {
      console.error("Error submitting review:", err);
      const confirmLogin = window.confirm("You have to login first !");
      if (!confirmLogin) return; // Exit if user cancels
      navigate("/login");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <ToastContainer />{" "}
      <h2 className="text-lg font-bold mb-4">Write a Comment</h2>
      {/* Review Form */}
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <textarea
          className="flex-grow border border-gray-300 rounded-full p-2 pl-4 focus:outline-none focus:ring focus:border-blue-500 resize-none"
          rows="1"
          placeholder="Write a comment..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
