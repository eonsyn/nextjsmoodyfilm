import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [dragging, setDragging] = useState(false); // Track drag state
  const [startX, setStartX] = useState(0); // Track initial mouse position
  const [scrollLeft, setScrollLeft] = useState(0); // Track scroll position
  const [scrollSpeed, setScrollSpeed] = useState(0); // Track scroll speed
  const [lastScrollTime, setLastScrollTime] = useState(0); // Track last time scroll was updated

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
  const handleDownload = async (downloadHref) => {
    setProcessing(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/test?url=${encodeURIComponent(
          downloadHref
        )}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch the original URL");
      }
      const data = await response.json();
      if (data.redirectedUrl) {
        window.open(data.redirectedUrl, "_blank");
      } else {
        toast.error("Failed to retrieve the original URL");
      }
    } catch (error) {
      console.error("Error processing download link:", error);
      toast.error("Error processing download link");
    } finally {
      setProcessing(false);
    }
  };

  // Function to handle mouse down event and start dragging
  const handleMouseDown = (e) => {
    setDragging(true);
    setStartX(e.clientX); // Capture the initial mouse position
    setScrollLeft(e.target.scrollLeft); // Capture the initial scroll position
  };

  // Function to handle mouse move event during drag
  const handleMouseMove = (e) => {
    if (!dragging) return;
    const move = e.clientX - startX; // Calculate how far the mouse has moved
    e.target.scrollLeft = scrollLeft - move; // Update the scroll position
    const currentTime = Date.now();
    if (lastScrollTime) {
      const elapsedTime = currentTime - lastScrollTime;
      setScrollSpeed(move / elapsedTime); // Update scroll speed based on time
    }
    setLastScrollTime(currentTime);
  };

  // Function to handle mouse up event and stop dragging
  const handleMouseUp = () => {
    setDragging(false);
    setLastScrollTime(0); // Reset time tracking when dragging stops
  };

  // Function to reset the scrolling speed when the user leaves the image gallery
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Function to auto scroll at the calculated speed when not dragging
  useEffect(() => {
    if (!dragging) {
      const scrollInterval = setInterval(() => {
        document.getElementById("image-scroll").scrollLeft += scrollSpeed; // Move based on the speed
      }, 16); // Around 60fps (16ms)

      return () => clearInterval(scrollInterval); // Cleanup interval on unmount or when dragging
    }
  }, [dragging, scrollSpeed]);

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

      {/* Image Gallery with Draggable Infinite Scroll */}
      <div
        id="image-scroll"
        className="relative overflow-hidden mb-6"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ cursor: dragging ? "grabbing" : "grab" }} // Change cursor style when dragging
      >
        <motion.div className={`flex ${isHovered ? "pause-animation" : ""}`}>
          {/* Duplicate the images to create the illusion of infinite scroll */}
          {[...movie.imageData, ...movie.imageData].map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Movie Image ${index + 1}`}
              className="w-[90vmin] ml-3 h-[50vmin] object-cover rounded-md shadow-md"
            />
          ))}
        </motion.div>
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
                onClick={() => handleDownload(download.downloadHref)}
                className="text-blue-600 hover:text-blue-800 flex items-center"
                disabled={processing}
              >
                {processing ? (
                  <ClipLoader size={20} loading={processing} />
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
