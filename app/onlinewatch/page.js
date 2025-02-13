"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const VideoPlayer = () => {
  const searchParams = useSearchParams();
  const videoUrl = searchParams.get("url");

  return (
    <div className="w-full  rounded-lg   shadow-xl border border-white/20 bg-white/10 backdrop-blur-lg p-4">
      {videoUrl ? (
        <video controls className="w-full h-auto rounded-lg">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-6">
        Online Watch
      </h1>

      {/* Wrapping VideoPlayer in Suspense to avoid CSR de-optimization */}
      <Suspense fallback={<p className="text-gray-400">Loading video...</p>}>
        <VideoPlayer />
      </Suspense>
    </div>
  );
};

export default OnlineWatch;
