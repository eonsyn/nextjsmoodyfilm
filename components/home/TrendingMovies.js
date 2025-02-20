"use client";

import React, { useEffect, useState } from "react";
import Card from "../basicComponent/card";
const TrendingMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/home`
        );
        const data = await response.json();

        if (data.films && data.films.length > 0) {
          // Shuffle and select 4 random movies
          const shuffledMovies = data.films
            .sort(() => 0.5 - Math.random())
            .slice(0, 4);
          setMovies(shuffledMovies);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="w-full  text-white py-16 px-6 md:px-12">
      <div className="max-w-5xl mx-auto text-center">
        {/* Section Title */}
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-red-500">
          Trending Moody Movies
        </h2>

        {/* Movie Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {movies.length > 0 ? (
            movies.map((movie) => <Card key={movie._id} {...movie} />)
          ) : (
            <p className="text-gray-300 text-lg">Loading movies...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrendingMovies;
