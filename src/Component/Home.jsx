// src/pages/Home.js
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import Card from "../BasicComponent/Card";
import { useSearch } from "../context/SearchContext"; // Import the context

const Home = () => {
  const { searchTerm } = useSearch(); // Access search term from context
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/home`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10">
        <ClipLoader size={50} loading={loading} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-600">
        <p>Error loading movies: {error}</p>
      </div>
    );
  }

  // Filter movies based on search term
  const filteredMovies = movies.filter((movie) =>
    movie.filmTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
        Movie Library
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 h-screen">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <Card
              key={movie._id}
              title={movie.filmTitle}
              thumbnail={movie.urlOfThumbnail}
              id={movie._id}
            />
          ))
        ) : (
          <p className="text-center col-span-4">No movies found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
