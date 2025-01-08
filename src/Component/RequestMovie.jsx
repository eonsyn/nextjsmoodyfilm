import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RequestMovie = () => {
  const [formData, setFormData] = useState({ email: "", filmName: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/request-film`,
        formData
      );

      if (response.status === 201) {
        toast.success(
          "Your request has been submitted. The film will be available within 24 hours, and you will receive an email confirmation."
        );
        setFormData({ email: "", filmName: "" });
      }
    } catch (error) {
      console.error("Error submitting film request:", error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Request a Movie 🎬
        </h1>
        <p className="text-sm text-gray-600 mb-4 text-center">
          Can't find the movie you want? Submit a request and we'll notify you
          when it's available!
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="filmName"
              className="block text-sm font-medium text-gray-700"
            >
              Movie Name
            </label>
            <input
              type="text"
              name="filmName"
              id="filmName"
              value={formData.filmName}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter the exact movie name (ensure correct spelling)"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full p-3 rounded-md text-white font-semibold transition duration-300 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </form>
        <p className="text-sm text-gray-500 mt-6 text-center">
          Note: Please ensure the movie name is accurate, and the spelling is
          correct to help us process your request promptly.
        </p>
      </div>
    </div>
  );
};

export default RequestMovie;
