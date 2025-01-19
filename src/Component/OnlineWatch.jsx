import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const OnlineWatch = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0, // Scroll to the top of the page
      behavior: "smooth", // Smooth scrolling effect
    });
  }, []);

  // Extract the query parameters from the URL
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const videoUrl = params.get("url"); // Extract the 'url' parameter

  // Check if the 'url' parameter exists
  if (!videoUrl) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-700 font-semibold">
          Error: No video URL provided!
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-[90%] max-w-4xl rounded-lg shadow-lg bg-white p-4">
        <video controls preload="auto" className="w-full rounded-lg">
          <source src={videoUrl} type="video/mp4" />
          <p>
            Your browser does not support the video tag. You can{" "}
            <a href={videoUrl} className="text-blue-600 hover:underline">
              download the video here
            </a>
            .
          </p>
        </video>
      </div>
    </div>
  );
};

export default OnlineWatch;
