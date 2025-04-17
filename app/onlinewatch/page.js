"use client";

import Hls from "hls.js";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

const AD_SCRIPT_URL = "//compassionunsuccessful.com/11d07442a2e610464e7bd1e318d65962/invoke.js";
const AD_DIV_ID = "container-11d07442a2e610464e7bd1e318d65962";

const VideoPlayer = () => {
  const searchParams = useSearchParams();
  const videoUrl = searchParams.get("url");
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [showAd, setShowAd] = useState(false);

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

  // Random timer between 10–15 min to show the ad
  useEffect(() => {
    const delay = Math.floor(Math.random() * (15 - 10 + 1) + 10) * 60 * 1000;

    const adTimer = setTimeout(() => {
      setShowAd(true);
    }, delay);

    return () => clearTimeout(adTimer);
  }, []);

  // Inject ad script when ad is shown
  useEffect(() => {
    if (showAd) {
      const script = document.createElement("script");
      script.src = AD_SCRIPT_URL;
      script.async = true;
      script.setAttribute("data-cfasync", "false");

      const container = document.getElementById(AD_DIV_ID);
      if (container) {
        container.innerHTML = ""; // Clear old content before inserting new script
        container.appendChild(script);
      }
    }
  }, [showAd]);

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
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-2 relative">
      <div className="w-full sm:w-[90%] max-w-4xl rounded-lg shadow-lg sm:p-2">
        {loading && (
          <div className="text-center text-gray-700 font-semibold mb-4">
            ⏳ Loading video...
          </div>
        )}
        <video ref={videoRef} controls className="w-full" />
      </div>

      {showAd && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          style={{ backdropFilter: "blur(4px)" }}
        >
          <div id={AD_DIV_ID}></div>
          <button
            onClick={() => setShowAd(false)}
            className="absolute top-4 right-4 text-white text-2xl font-bold"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

const OnlineWatch = () => (
  <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
    <VideoPlayer />
  </Suspense>
);

export default OnlineWatch;
