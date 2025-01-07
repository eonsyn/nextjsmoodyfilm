// WatchMovie.jsx
import React from "react";
import { useParams } from "react-router-dom";

const WatchMovie = () => {
  // Extract the video ID from the URL params
  const { id } = useParams();

  // Check if the ID exists
  if (!id) {
    return <p>Error: No video ID provided!</p>;
  }

  // Construct the Dailymotion video URL using the extracted ID
  const videoUrl = `https://geo.dailymotion.com/player.html?video=${id}`;

  return (
    <div className="overflow-hidden mb-7 flex h-screen w-screen items-center justify-center">
      <div className="relative pb-[56.25%] w-[90%] h-[80%] overflow-hidden">
        <iframe
          src={videoUrl}
          className="absolute top-1/2 left-1/2 w-[70%] h-[70%] border-none transform -translate-x-1/2 -translate-y-1/2"
          allowFullScreen
          title="Dailymotion Video Player"
          allow="web-share"
        ></iframe>
      </div>
    </div>
  );
};

export default WatchMovie;
