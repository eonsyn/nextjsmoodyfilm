"use client";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MovieRequest() {
  const [formData, setFormData] = useState({ email: "", filmName: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API request
      setTimeout(() => {
        toast.success("Movie request submitted successfully!");
        setLoading(false);
        setFormData({ email: "", filmName: "" });
      }, 1500);
    } catch (error) {
      toast.error("Failed to submit request. Try again later.");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center px-6 text-white  ">
        <ToastContainer />
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-lg shadow-2xl w-full max-w-lg border border-red-500/40">
          {/* Title */}
          <h2 className="text-3xl font-extrabold text-center text-red-500">
            🎬 Request a Movie
          </h2>
          <p className="text-gray-400 text-sm text-center mt-2">
            Can't find your favorite movie? Request it now, and we'll try to add
            it within <strong>24 hours</strong>!
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-gray-300 text-sm">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:ring-red-400 focus:border-red-400 transition"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Movie Name Field */}
            <div>
              <label className="block text-gray-300 text-sm">Movie Name</label>
              <input
                type="text"
                name="filmName"
                value={formData.filmName}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:ring-red-400 focus:border-red-400 transition"
                placeholder="Enter the movie name"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full py-3 rounded-lg font-semibold text-black transition ${
                loading
                  ? "bg-red-600 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              }`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </form>

          {/* Note */}
          <p className="text-xs text-gray-400 mt-4 text-center">
            <strong>Note:</strong> Ensure the movie name is spelled correctly to
            process your request faster.
          </p>
        </div>
      </div>
    </>
  );
}
