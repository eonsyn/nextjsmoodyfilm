"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const adData = [
  {
    scriptSrc:
      "//compassionunsuccessful.com/11d07442a2e610464e7bd1e318d65962/invoke.js",
    containerId: "container-11d07442a2e610464e7bd1e318d65962",
  },
  {
    scriptSrc:
      "//compassionunsuccessful.com/6ee3bad1f694b2d28ef6ed8bddc250cf/invoke.js",
    containerId: "container-6ee3bad1f694b2d28ef6ed8bddc250cf",
  },
  {
    scriptSrc:
      "//compassionunsuccessful.com/0f147488d46416d0d0ba84687d28d51d/invoke.js",
    containerId: "container-0f147488d46416d0d0ba84687d28d51d",
  },
  {
    scriptSrc:
      "//compassionunsuccessful.com/25c373145eba82ca3966cda30fba9654/invoke.js",
    containerId: "container-25c373145eba82ca3966cda30fba9654",
  },
];

let adIndex = 0;

const AdCard = () => {
  const cardRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [ad, setAd] = useState(null);

  useEffect(() => {
    // Assign a unique ad to this instance
    setAd(adData[adIndex % adData.length]);
    adIndex++;
  }, []);

  useEffect(() => {
    if (!ad || typeof window === "undefined") return;

    if (!document.getElementById(ad.containerId)) {
      const script = document.createElement("script");
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      script.src = ad.scriptSrc;
      script.onload = () => console.log("Ad script loaded.");
      document.body.appendChild(script);
    }
  }, [ad]);

  useEffect(() => {
    const checkAd = setInterval(() => {
      if (ad) {
        const adContainer = document.getElementById(ad.containerId);
        if (adContainer && adContainer.innerHTML.trim().length > 0) {
          console.log("Ad loaded successfully.");
          clearInterval(checkAd);
        }
      }
    }, 1000);

    return () => clearInterval(checkAd);
  }, [ad]);

  useEffect(() => {
    if (cardRef.current && loading) {
      gsap.fromTo(
        cardRef.current,
        { backdropFilter: "blur(0px)", opacity: 0 },
        {
          backdropFilter: "blur(10px)",
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        }
      );
    }
  }, [loading]);

  const openAd = () => {
    setLoading(true);
    window.open(
      "https://compassionunsuccessful.com/g0hw4rr1?key=cdd8bdca93ac509c313b4aceb35f084e",
      "_blank"
    );
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <div
      className="card aspect-w-16 aspect-h-9 relative bg-gray-200 shadow-lg rounded-lg overflow-hidden transition-all transform hover:scale-105 hover:shadow-2xl h-[450px] sm:h-[450px] cursor-pointer "
      onClick={openAd}
    >
      {loading && (
        <div
          ref={cardRef}
          className="waiting-card absolute top-0 left-0 w-full h-full bg-white/30 backdrop-blur-md flex items-center justify-center z-20"
        >
          <div className="text-white text-lg font-semibold">Loading Ad...</div>
        </div>
      )}
      <div className="relative h-full bg-gray-700">
        {/* Ad Container */}
        {ad && <div id={ad.containerId} className="w-full h-full"></div>}
        {/* Overlay with Text */}
        <div className="absolute bottom-0 h-[50%] w-full bg-gradient-to-t from-black via-transparent to-transparent p-4 text-white text-center">
          <h1 className="text-xl font-bold">Sponsored Ad</h1>
          <p className="text-sm text-gray-300 mt-2">Click to help us</p>
        </div>
      </div>
    </div>
  );
};

export default AdCard;
