import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const Card = ({ title, thumbnail, id, ratingImdb }) => {
  return (
    <Link to={`/movie/${id}`}>
      <div
        key={id}
        className="aspect-w-16 aspect-h-9 bg-gray-200 shadow-lg rounded-lg overflow-hidden transition-all transform hover:scale-105 hover:shadow-2xl sm:h-[450px]  "
      >
        <div className="relative h-full  bg-gray-400">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-[100%] object-cover opacity-0 transition-opacity duration-700"
            onLoad={(e) => (e.target.style.opacity = "1")} // Smooth fade-in on load
          />
          <div className="absolute bottom-0 h-[50%] w-full bg-gradient-to-t from-black via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h2 className="text-lg font-semibold z-10 text-white truncate">
              {title}
            </h2>
            <div className="flex justify-between text-slate-300 items-center mt-2">
              <p className="flex justify-center items-center h-[10%]">
                <FaStar className="text-yellow-500" />
                <span className="pl-2">{ratingImdb}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
