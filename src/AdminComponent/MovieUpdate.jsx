import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useSearch } from "../context/SearchContext"; // Import the context

const MovieUpdate = () => {
  const { searchTerm } = useSearch(); // Get searchTerm from context
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  // Fetch movies on component mount
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/admin/home`,
          {
            withCredentials: true, // Include cookies in the request
          }
        );
        const { films } = response.data; // Extract 'films' from the response
        setMovies(films || []); // Ensure 'films' is an array
      } catch (error) {
        console.error("Error fetching movies:", error);
        toast.error("Failed to fetch movies. Please try again.");
      }
    };
    fetchMovies();
  }, []);

  // Advanced search logic
  const getFilteredMovies = () => {
    if (!searchTerm.trim()) return movies;

    const searchWords = searchTerm.toLowerCase().split(" ");
    return movies.filter((movie) =>
      searchWords.every((word) => movie.filmTitle.toLowerCase().includes(word))
    );
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this film?"
      );
      if (!confirmDelete) return; // Exit if user cancels

      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/admin/delete/${id}`,
        {
          withCredentials: true, // Include cookies in the request
        }
      );
      setMovies(movies.filter((movie) => movie._id !== id));
      toast.success("Film deleted successfully.");
    } catch (error) {
      console.error("Error deleting movie:", error);
      toast.error("Failed to delete the film. Please try again.");
    }
  };

  const filteredMovies = getFilteredMovies();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Movies</h1>

      {/* Movie list */}
      <div className="grid gap-6 max-w-4xl mx-auto">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div
              key={movie._id}
              className="flex items-center justify-between border border-gray-300 p-4 rounded-lg shadow-lg bg-white"
            >
              {/* Thumbnail and title */}
              <div className="flex items-center space-x-4">
                <img
                  src={movie.urlOfThumbnail}
                  alt={movie.filmTitle}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h2 className="text-lg font-semibold">{movie.filmTitle}</h2>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center space-x-4">
                {/* Edit Button */}
                <button
                  onClick={() => navigate(`/admin/MovieEdit/${movie._id}`)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center shadow-md"
                >
                  <FaEdit className="mr-2" /> Edit
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(movie._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center shadow-md"
                >
                  <FaTrash className="mr-2" /> Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-6">
            No movies found for the search term "
            <span className="font-semibold">{searchTerm}</span>".
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieUpdate;
