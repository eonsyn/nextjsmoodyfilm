import axios from "axios";
import React, { useState } from "react";
import { FaFilm } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MovieForm = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [postUrl, setPostUrl] = useState("");
  const [formData, setFormData] = useState({
    filmTitle: "",
    description: "",
    imdbRating: "",
    directedBy: "",
    genre: [],
    urlOfThumbnail: "",
    urlOfPost: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch IMDb Data
  const handleGetData = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/admin/getImdbData`,
        { url },
        { withCredentials: true }
      );
      const data = response.data;

      // Update formData with fetched data
      setFormData({
        filmTitle: data.filmname || "",
        description: data.storySummary || "",
        imdbRating: data.rating || "",
        directedBy: data.director || "",
        genre: data.genres || [],
        urlOfThumbnail: data.posterImg || "",
        urlOfPost: postUrl,
      });

      toast.success("Data fetched successfully!");
    } catch (error) {
       
      toast.error("Failed to fetch data. Please check the URL.");
    } finally {
      setLoading(false);
    }
  };

  // Submit Form Data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/admin/sendFormData`,
        formData,
        { withCredentials: true }
      );

      // Reset form data after successful submission
      setFormData({
        filmTitle: "",
        description: "",
        imdbRating: "",
        directedBy: "",
        genre: [],
        urlOfThumbnail: "",
        urlOfPost: "",
      });
      setPostUrl("");
      setUrl("");
      toast.success("Form submitted successfully!");
    } catch (error) {
       
      toast.error("Failed to submit the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <FaFilm className="text-yellow-500" /> Movie Form
          </h1>
          <p className="text-gray-600">
            Fetch IMDb data and submit movie details easily.
          </p>
        </div>

        {/* IMDb URL Input */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            IMDb URL:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste IMDb URL here"
              className="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
              onClick={handleGetData}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
            >
              {loading ? <ClipLoader size={20} color="#fff" /> : "Get Data"}
            </button>
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Film Title */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Film Title:
            </label>
            <input
              type="text"
              value={formData.filmTitle}
              onChange={(e) =>
                setFormData({ ...formData, filmTitle: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Description:
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* IMDb Rating and Director */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                IMDb Rating:
              </label>
              <input
                type="text"
                value={formData.imdbRating}
                onChange={(e) =>
                  setFormData({ ...formData, imdbRating: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Directed By:
              </label>
              <input
                type="text"
                value={formData.directedBy}
                onChange={(e) =>
                  setFormData({ ...formData, directedBy: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          </div>

          {/* Genre */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Genre (comma-separated):
            </label>
            <input
              type="text"
              value={formData.genre.join(", ")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  genre: e.target.value.split(",").map((g) => g.trim()),
                })
              }
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Thumbnail URL */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Thumbnail URL:
            </label>
            <input
              type="text"
              value={formData.urlOfThumbnail}
              onChange={(e) =>
                setFormData({ ...formData, urlOfThumbnail: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Post URL */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Post URL:
            </label>
            <input
              type="text"
              value={postUrl}
              onChange={(e) => {
                setPostUrl(e.target.value);
                setFormData({ ...formData, urlOfPost: e.target.value });
              }}
              placeholder="Paste post URL here"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
            disabled={loading}
          >
            {loading ? <ClipLoader size={20} color="#fff" /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MovieForm;
