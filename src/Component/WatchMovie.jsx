// WatchMovie.jsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const WatchMovie = () => {
  // Extract the playlist ID from the URL params
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo({
      top: 0, // Scroll to the top of the page
      behavior: "smooth", // Smooth scrolling effect
    });
  }, []);

  // Check if the ID exists
  if (!id) {
    return <p>Error: No playlist ID provided!</p>;
  }

  // Construct the embed URL for the Dailymotion playlist
  const embedUrl = `https://www.dailymotion.com/embed/playlist/${id}`;

  return (
    <div className="overflow-hidden mb-7 flex h-screen w-screen items-center justify-center">
      <div className="relative pb-[56.25%] w-[90%] h-[80%] overflow-hidden">
        <iframe
          src={embedUrl}
          className="absolute top-1/2 left-1/2 w-[70%] h-[70%] border-none transform -translate-x-1/2 -translate-y-1/2"
          allowFullScreen
          title="Dailymotion Playlist Player"
          allow="autoplay; fullscreen"
        ></iframe>
      </div>
    </div>
  );
};

export default WatchMovie;
