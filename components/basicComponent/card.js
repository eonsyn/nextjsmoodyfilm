"use client";
import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";

const Card = ({ filmTitle, imdbRating, _id, genre, urlOfThumbnail }) => {
  const cardRef = useRef(null);
  const playIconRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);

    // Set a timeout to hide the loading animation after 3 seconds
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

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

  useEffect(() => {
    if (playIconRef.current && loading) {
      const pathLength = playIconRef.current
        .querySelector("polygon")
        .getTotalLength();

      gsap.set(playIconRef.current.querySelector("polygon"), {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      gsap.to(playIconRef.current.querySelector("polygon"), {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.out",
      });
    }
  }, [loading]);

  return (
    <Link
      href={`/movie/${_id}/${filmTitle.replace(/\s+/g, "-")}`}
      onClick={handleClick}
    >
      <div
        key={_id}
        className="card aspect-w-16 aspect-h-9 relative bg-gray-200 shadow-lg rounded-lg overflow-hidden transition-all transform hover:scale-105 hover:shadow-2xl sm:h-[450px]"
      >
        {loading && (
          <div
            ref={cardRef}
            className="waiting-card absolute top-0 left-0 w-full h-full bg-white/30 backdrop-blur-md flex items-center justify-center z-20"
          >
            <svg
              ref={playIconRef}
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        )}
        <div className="relative h-full bg-red-600">
          {/* mix-blend-darken */}
          <img
            src={urlOfThumbnail}
            alt={filmTitle}
            loading="lazy"
            className="w-full h-full mix-blend-plus-darker  object-cover opacity-0 transition-opacity duration-700"
            onLoad={(e) => (e.target.style.opacity = "1")}
          />
          <div className="absolute bottom-0 h-[50%] w-full bg-gradient-to-t from-black via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h2 className="text-lg font-semibold z-10 text-white truncate">
              {filmTitle}
            </h2>
            <div className="flex justify-between text-slate-300 items-center mt-2">
              <p className="flex justify-center items-center h-[10%]">
                <FaStar className="text-yellow-500" />
                <span className="pl-2">{imdbRating}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
