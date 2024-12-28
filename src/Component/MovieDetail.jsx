import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingId, setProcessingId] = useState(null); // Track the clicked download button
  const [isHovered, setIsHovered] = useState(false); // For image hover

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/film/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }

        const data = await response.json();
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

  // Function to handle the URL processing and redirect
  const handleDownload = async (downloadHref, downloadId) => {
    // Set processing state for the specific button clicked
    setProcessingId(downloadId);

    // Check if the link ends with .mkv
    if (downloadHref.endsWith(".mkv")) {
      // If it's an .mkv file, open the link directly
      window.open(downloadHref, "_blank");
      setProcessingId(null); // Reset processing state
    } else {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/test?url=${encodeURIComponent(downloadHref)}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch the original URL");
        }
        const data = await response.json();
        if (data.redirectedUrl) {
          window.open(data.redirectedUrl, "_blank");
        } else {
          toast.error("Try again");
        }
      } catch (error) {
        console.error("Error processing download link:", error);
        toast.error("try again");
      } finally {
        setProcessingId(null); // Reset processing state after download
      }
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
              <button
                onClick={() =>
                  handleDownload(download.downloadHref, download._id)
                }
                className="text-blue-600 hover:text-blue-800 flex items-center"
                disabled={processingId === download._id}
              >
                {processingId === download._id ? (
                  <ClipLoader size={20} loading={true} />
                ) : (
                  "Download"
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
