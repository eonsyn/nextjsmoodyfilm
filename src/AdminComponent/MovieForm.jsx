import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";

const MovieForm = () => {
  const [formData, setFormData] = useState({
    filmTitle: "",
    urlOfPost: "",
    urlOfThumbnail: "",
    genre: [], // Ensure it's always an array
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "genre" && value
          ? value.split(",").map((g) => g.trim())
          : value, // Ensure 'genre' is split correctly
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Ensure 'genre' is an array (split by comma if it's a string)
    const updatedFormData = {
      ...formData,
      genre: Array.isArray(formData.genre)
        ? formData.genre
        : formData.genre
        ? formData.genre.split(",").map((g) => g.trim())
        : [], // Split by comma and remove extra spaces if it's a string
    };

    try {
      // Single API call to save the movie data
      console.log(updatedFormData);
      console.log(JSON.stringify(updatedFormData));
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/sendFormData`,
        {
          method: "POST",
          credentials: "include", // Include cookies in the request
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFormData),
        }
      );

      if (!response.ok) {
        throw new Error("unauthorise access: IP address sending to admin");
      }
      const data = await response.json();
      console.log(data);
      toast.success("film uploaded");

      setFormData({
        filmTitle: "",
        urlOfPost: "",
        urlOfThumbnail: "",
        genre: [], // Reset genre to empty array
      });
    } catch (err) {
      toast.error(`${err.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-md">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-center mb-6">
        Post Movie Details
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="filmTitle"
            className="block text-gray-700 font-medium"
          >
            Film Title
          </label>
          <input
            type="text"
            id="filmTitle"
            name="filmTitle"
            value={formData.filmTitle}
            onChange={handleChange}
            required
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label
            htmlFor="urlOfPost"
            className="block text-gray-700 font-medium"
          >
            URL of Post
          </label>
          <input
            type="url"
            id="urlOfPost"
            name="urlOfPost"
            value={formData.urlOfPost}
            onChange={handleChange}
            required
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label
            htmlFor="urlOfThumbnail"
            className="block text-gray-700 font-medium"
          >
            URL of Thumbnail
          </label>
          <input
            type="url"
            id="urlOfThumbnail"
            name="urlOfThumbnail"
            value={formData.urlOfThumbnail}
            onChange={handleChange}
            required
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label htmlFor="genre" className="block text-gray-700 font-medium">
            Genre (Optional, comma-separated)
          </label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre.join(", ")} // Join array into a comma-separated string for display
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          disabled={loading}
        >
          {loading ? <ClipLoader size={20} color="#ffffff" /> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default MovieForm;
