"use client";

import Hls from "hls.js";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

const VideoPlayer = () => {
  const searchParams = useSearchParams();
  const videoUrl = searchParams.get("url");
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
      hls.on(Hls.Events.ERROR, (_, data) => console.error("HLS Error:", data));

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
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-2">
      <div className="w-full sm:w-[90%] max-w-4xl rounded-lg shadow-lg sm:p-2">
        {loading && (
          <div className="text-center text-gray-700 font-semibold mb-4">
            ⏳ Loading video...
          </div>
        )}
        <video ref={videoRef} controls className="w-full" />
      </div>
    </div>
  );
};

const OnlineWatch = () => (
  <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
    <VideoPlayer />
  </Suspense>
);

export default OnlineWatch;