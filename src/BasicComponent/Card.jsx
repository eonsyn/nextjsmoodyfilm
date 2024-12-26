import React from "react";
import { Link } from "react-router-dom";

const Card = ({ title, thumbnail, id }) => {
  return (
    <Link to={`/movie/${id}`}>
      <div
        key={id}
        className=" aspect-w-16 aspect-h-9 bg-white  shadow-lg rounded-lg overflow-hidden transition-all transform hover:scale-105 hover:shadow-2xl h-[450px]" // Set fixed height for card
      >
        <div className="relative h-full">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-[100%] object-cover" // Set the image height to 60% of the card height
          />
          <div className="    absolute bottom-0 h-[50%] w-full bg-gradient-to-t from-black via-transparent to-transparent "></div>
          <div className="absolute  bottom-0 left-0 right-0  p-4">
            <h2 className="text-lg font-semibold z-10 text-white truncate">
              {title}
            </h2>
            <div className="flex justify-between text-slate-300 items-center mt-2">
              <p>Download here</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
