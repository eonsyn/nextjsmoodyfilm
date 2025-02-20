"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const AdCard = () => {
  const cardRef = useRef(null);
  const adContainerId = "container-11d07442a2e610464e7bd1e318d65962";

  useEffect(() => {
    // Prevent execution on the server
    if (typeof window === "undefined") return;

    // Check if script is already added to avoid duplicates
    if (!document.getElementById("ad-script")) {
      const script = document.createElement("script");
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      script.src =
        "//compassionunsuccessful.com/11d07442a2e610464e7bd1e318d65962/invoke.js";
      script.id = "ad-script";

      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className="card aspect-w-16 aspect-h-9 relative bg-gray-200 shadow-lg rounded-lg overflow-hidden transition-all transform hover:scale-105 hover:shadow-2xl sm:h-[450px]"
    >
      {/* Ad Placeholder with Text */}
      <div className="relative h-full bg-gradient-to-br from-gray-700 to-gray-900 flex flex-col items-center justify-center text-white">
        <h1 className="text-2xl font-bold text-center">Sponsored Ad</h1>
        <p className="text-sm text-gray-300 mt-2">Advertisement</p>
      </div>

      {/* Ad Container */}
      <div id={adContainerId} className="absolute inset-0"></div>
    </div>
  );
};

export default AdCard;
