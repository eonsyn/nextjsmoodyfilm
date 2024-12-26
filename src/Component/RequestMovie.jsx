import React, { useState } from "react";
import axios from "axios";

const RequestMovie = () => {
  const [formData, setFormData] = useState({ email: "", filmName: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/request-film`,
        formData
      );

      if (response.status === 201) {
        setMessage(
          "Your request has been submitted. The film will be available within 24 hours, and you will receive an email confirmation."
        );
        setFormData({ email: "", filmName: "" });
      }
    } catch (error) {
      console.error("Error submitting film request:", error);
      setError(
        error.response?.data?.message ||
          "An error occurred. Please try again later."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Request a Movie</h1>
        {message && (
          <p className="text-green-500 text-sm mb-4 text-center">{message}</p>
        )}
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="filmName"
              className="block text-sm font-medium text-gray-700"
            >
              Film Name
            </label>
            <input
              type="text"
              name="filmName"
              id="filmName"
              value={formData.filmName}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter the film name"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestMovie;
