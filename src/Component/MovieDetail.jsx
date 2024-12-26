import React, { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";

const MovieDetail = () => {
  const { id } = useParams(); // Get the movie id from the URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Fetch movie details by id
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/film/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }

        const data = await response.json();
        console.log(data);
        setMovie(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  // Function to handle the reload of download link
  const loadLink = async (finalLink) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/testdownload`,
        {
          method: "POST", // Use POST instead of GET
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: finalLink }), // Send the body with the request
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch the download link");
      }
      toast.success("new link generated");
      const data = await response.json();
      // Update the downloadHref with the new final link
      const updatedMovie = { ...movie };
      updatedMovie.downloadData = updatedMovie.downloadData.map((download) =>
        download.finalLink === finalLink
          ? { ...download, downloadHref: data.finalLink }
          : download
      );
      setMovie(updatedMovie);
    } catch (error) {
      toast.error("failed to generate");
      console.error("Error reloading download link:", error);
    }
  };

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
        <p>Error loading movie details: {error}</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="text-center mt-10 text-gray-600">
        <p>No movie data available</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
        {movie.filmTitle}
      </h1>

      {/* Title Preview and Video Quality */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Preview of Video quality
        </h2>
      </div>

      {/* Image Gallery with Infinite Scroll */}
      <div
        className="relative overflow-hidden mb-6"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`flex animate-scroll ${
            isHovered ? "pause-animation" : ""
          }`}
        >
          {/* Duplicate the images to create the illusion of infinite scroll */}
          {[...movie.imageData, ...movie.imageData].map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Movie Image ${index + 1}`}
              className="w-[90vmin] ml-3 h-[50vmin] object-cover rounded-md shadow-md"
            />
          ))}
        </div>
      </div>

      {/* Download Links */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Download Options
        </h2>
        <div className="space-y-4">
          {movie.downloadData.map((download) => (
            <div
              key={download._id}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-md shadow-md"
            >
              <span className="text-gray-800">{download.title}</span>
              {download.downloadHref ? (
                <a
                  href={download.downloadHref}
                  className="text-blue-600 hover:text-blue-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaDownload size={20} />
                </a>
              ) : (
                <button
                  onClick={() => loadLink(download.finalLink)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Reload the download
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
