import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function Watchondailymotion() {
  useEffect(() => {
    window.scrollTo({
      top: 0, // Scroll to the top of the page
      behavior: "smooth", // Smooth scrolling effect
    });
  }, []);

  const { id } = useParams(); // Extract the video ID from the URL

  return (
    <div className="flex justify-center items-center bg-black rounded-lg shadow-lg overflow-hidden   w-[60vw]   max-w-4xl mx-auto my-5">
      <div className="relative w-full pb-[56.25%]">
        <iframe
          src={`https://geo.dailymotion.com/player.html?video=${id}`}
          className="absolute top-0 left-0 w-full h-full border-none"
          allowFullScreen
          title="Dailymotion Video Player"
          allow="web-share"
        ></iframe>
      </div>
    </div>
  );
}

export default Watchondailymotion;
