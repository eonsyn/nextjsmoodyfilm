"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const VideoPlayer = () => {
  const searchParams = useSearchParams();
  const videoUrl = searchParams.get("url");
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (videoUrl && videoRef.current) {
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        autoplay: false,
        responsive: true,
        fluid: true,
      });

      playerRef.current.src({
        src: videoUrl,
        type: "application/x-mpegURL",
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [videoUrl]);

  return (
    <div className="w-full rounded-lg shadow-xl border border-white/20 bg-white/10 backdrop-blur-lg p-4 overflow-hidden">
      {videoUrl ? (
        <video
          ref={videoRef}
          className="video-js vjs-default-skin w-full h-auto rounded-lg"
        />
      ) : (
        <div className="p-6 text-center text-white/80">
          <p>No video URL provided.</p>
        </div>
      )}
    </div>
  );
};

const OnlineWatch = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-4">
      <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-6">
        Online Watch
      </h1>
      <VideoPlayer />
    </div>
  );
};

export default OnlineWatch;
