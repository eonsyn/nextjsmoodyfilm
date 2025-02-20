"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

const AdCard = () => {
  const cardRef = useRef(null);
  const adContainerId = "container-11d07442a2e610464e7bd1e318d65962";

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Ensure the script is loaded only once
    if (!document.getElementById("ad-script")) {
      const script = document.createElement("script");
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      script.src =
        "//compassionunsuccessful.com/11d07442a2e610464e7bd1e318d65962/invoke.js";
      script.id = "ad-script";
      script.onload = () => {
        console.log("Adsterra script loaded.");
      };

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
    <Link
      href="https://compassionunsuccessful.com/g0hw4rr1?key=cdd8bdca93ac509c313b4aceb35f084e"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div
        ref={cardRef}
        className="relative cursor-pointer bg-gray-200 shadow-lg rounded-lg overflow-hidden transition-all transform hover:scale-105 hover:shadow-2xl sm:h-[450px]"
      >
        {/* Ad Container */}
        <div id={adContainerId} className="w-full h-full"></div>

        {/* Overlay with Text (Ensure it does not cover the ad) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-gradient-to-br from-gray-700 to-gray-900 opacity-80 pointer-events-none">
          <h1 className="text-2xl font-bold text-center">Sponsored Ad</h1>
          <p className="text-sm text-gray-300 mt-2">Advertisement</p>
        </div>
      </div>
    </Link>
  );
};

export default AdCard;
