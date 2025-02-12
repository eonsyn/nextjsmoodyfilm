import { FaStar } from "react-icons/fa";

export default function DummyCard({ isAd }) {
  const handleClick = () => {
    console.log("Card clicked!", isAd);
  };

  return (
    <div
      className="card aspect-w-16  h-9 relative bg-gray-200 shadow-lg rounded-lg overflow-hidden transition-all transform hover:scale-105 hover:shadow-2xl sm:h-[450px]"
      onClick={handleClick}
    >
      {/* Loading State */}
      <div className="absolute top-0 left-0 w-full h-full bg-white/30 backdrop-blur-md flex items-center justify-center z-20">
        {isAd ? <p>this is an advertisement</p> : <p>not an advertisement</p>}
      </div>

      {/* Movie Thumbnail */}
      <div className="relative h-full bg-gray-400">
        <img
          src="https://via.placeholder.com/300x450"
          alt="Dummy Movie"
          className="w-full h-full object-cover opacity-0 transition-opacity duration-700"
          onLoad={(e) => (e.target.style.opacity = "1")}
        />

        {/* Gradient Overlay */}
        <div className="absolute bottom-0 h-[50%] w-full bg-gradient-to-t from-black via-transparent to-transparent"></div>

        {/* Movie Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h2 className="text-lg font-semibold z-10 text-white truncate">
            Dummy Movie Title
          </h2>
          <div className="flex justify-between text-slate-300 items-center mt-2">
            <p className="flex justify-center items-center">
              <FaStar className="text-yellow-500" />
              <span className="pl-2">8.5</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
