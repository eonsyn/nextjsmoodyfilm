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
      <div className="min-h-screen flex items-center justify-center px-6   text-white">
        <ToastContainer />
        <div className=" bg-white/15 p-8 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-bold text-center text-blue-600">
            🎬 Request a Movie
          </h2>
          <p className="text-gray-400 text-sm text-center mt-2">
            Can't find your favorite movie? Request it now, and we'll try to add
            it within <strong>24 hours</strong>!
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-gray-300 text-sm">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm">Movie Name</label>
              <input
                type="text"
                name="filmName"
                value={formData.filmName}
                onChange={handleChange}
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter the movie name"
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full py-3 rounded font-semibold transition ${
                loading
                  ? "bg-blue-500 cursor-not-allowed"
                  : "bg-blue-400 hover:bg-blue-500"
              }`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </form>
          <p className="text-xs text-gray-400 mt-4 text-center">
            <strong>Note:</strong> Ensure the movie name is spelled correctly to
            process your request faster.
          </p>
        </div>
      </div>
    </>
  );
}
