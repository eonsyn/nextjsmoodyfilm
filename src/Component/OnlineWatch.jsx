import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Hls from "hls.js";

const OnlineWatch = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const videoUrl = params.get("url"); // Extract the video URL
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (!videoUrl) return;

    const video = videoRef.current;
    if (Hls.isSupported() && videoUrl.endsWith(".m3u8")) {
      const hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => setLoading(false));
      hls.on(Hls.Events.ERROR, (event, data) =>
        console.error("HLS Error:", data)
      );

      return () => hls.destroy();
    } else {
      video.src = videoUrl;
      setLoading(false);
    }
  }, [videoUrl]);

  if (!videoUrl) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-700 font-semibold">
          ❌ Error: No video URL provided!
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-[90%] max-w-4xl rounded-lg shadow-lg bg-white p-4">
        {loading && (
          <div className="text-center text-gray-700 font-semibold mb-4">
            ⏳ Loading video...
          </div>
        )}
        <video ref={videoRef} controls className="w-full rounded-lg" />
      </div>
    </div>
  );
};

export default OnlineWatch;
