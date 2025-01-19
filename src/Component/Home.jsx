import React, { useEffect, useState } from "react";

import Card from "../BasicComponent/Card";
import { useSearch } from "../context/SearchContext";
const Home = () => {
  const { searchTerm } = useSearch(); // Access search term from context
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(1); // Total pages available

  const fetchMovies = async (page = 1, search = "") => {
    setLoading(true);
    setError(null); // Reset error before fetching
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/home?page=${page}&search=${search}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      setMovies(data.films);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
      console.log("hi");
    }
  };

  useEffect(() => {
    fetchMovies(currentPage, searchTerm); // Fetch movies based on searchTerm and currentPage
  }, [currentPage, searchTerm]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({
        top: 0, // Scroll to the top of the page
        behavior: "smooth", // Smooth scrolling effect
      });
    }
  };

  const retrySearch = () => {
    fetchMovies(currentPage, searchTerm);
  };

  // Filter movies based on the search term (by title or genre)
  const filteredMovies = movies.filter(
    (movie) =>
      movie.filmTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (movie.genres &&
        movie.genres.some((genre) =>
          genre.toLowerCase().includes(searchTerm.toLowerCase())
        ))
  );

  if (loading) {
    return (
      <>
        <div className="mx-5 px-12   text-center mt-[2rem]">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Loading Movie
          </h1>
          {/* Dummy Cards with opacity animation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="aspect-w-16 aspect-h-9 bg-gray-200 shadow-lg rounded-lg overflow-hidden transition-all transform hover:scale-105 hover:shadow-2xl h-[450px] sm:h-[450px] animate-pulse"
              >
                <div className="relative bg-gray-300 h-full">
                  <div className="w-full h-[60%] bg-gray-400 animate-opacity"></div>{" "}
                  {/* Placeholder for the image */}
                  <div className="absolute bottom-0 h-[50%] w-full bg-gradient-to-t from-gray-600 via-gray-500 to-gray-400"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="h-6 w-3/4 bg-gray-500 rounded-md mb-2 animate-opacity"></div>{" "}
                    {/* Placeholder for title */}
                    <div className="flex justify-between items-center">
                      <div className="h-4 w-1/3 bg-gray-400 rounded-md animate-opacity"></div>{" "}
                      {/* Placeholder for rating */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center mt-8 mb-6">
          {/* Previous Button Skeleton */}
          <div className="px-4 py-2 mx-1 bg-gray-300 text-gray-400 rounded w-[80px] animate-pulse">
            &nbsp; {/* Placeholder for the button text */}
          </div>
          {/* Page Number Skeleton */}
          <div className="px-4 py-2 mx-1 bg-gray-200 text-gray-300 rounded w-[120px] animate-pulse">
            &nbsp; {/* Placeholder for page number */}
          </div>
          {/* Next Button Skeleton */}
          <div className="px-4 py-2 mx-1 bg-gray-300 text-gray-400 rounded w-[80px] animate-pulse">
            &nbsp; {/* Placeholder for the button text */}
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-600">
        <p>Error loading movies: {error}</p>
        <button
          onClick={retrySearch}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container min-h-[200vh] mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
        Movie Library
      </h1>
      {/* Movie Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <Card
              key={movie._id}
              title={movie.filmTitle}
              thumbnail={movie.urlOfThumbnail}
              id={movie._id}
              ratingImdb={movie.imdbRating ? movie.imdbRating : "N/A"}
              genre={movie.genre || "Unknown Genre"}
            />
          ))
        ) : (
          <p className="text-center col-span-4">No movies found</p>
        )}
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-1 ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500"
              : "bg-blue-500 text-white hover:bg-blue-600"
          } rounded`}
        >
          Previous
        </button>
        <span className="px-4 py-2 mx-1 text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 mx-1 ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500"
              : "bg-blue-500 text-white hover:bg-blue-600"
          } rounded`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
