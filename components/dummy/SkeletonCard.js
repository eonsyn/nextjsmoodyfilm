"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const SkeletonCard = () => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className="card aspect-w-16 aspect-h-9 relative bg-red-800 shadow-lg rounded-lg overflow-hidden transition-all transform hover:scale-105 hover:shadow-2xl sm:h-[450px]"
    >
      <div className="relative h-full w-full flex flex-col justify-end bg-gradient-to-t from-red-900 to-red-700 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="h-6 bg-red-600 rounded w-3/4 mb-2 animate-pulse"></div>
          <div className="h-4 bg-red-700 rounded w-1/4 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
