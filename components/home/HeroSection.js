import Link from "next/link";

function HeroSection() {
  return (
    <section className="relative w-full h-[90vh] md:h-[600px] flex items-center justify-center text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute  inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://cdn.pixabay.com/photo/2013/11/28/10/02/camera-219958_1280.jpg')",
        }} // Replace with actual image URL
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4 drop-shadow-lg">
          Find the Perfect <span className="text-red-500">Moody Movie</span>
        </h1>
        <p className="text-lg md:text-2xl mb-6 drop-shadow-sm opacity-90">
          Discover a world of atmospheric, emotional, and visually stunning
          films, carefully selected to match your mood.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/movie">
            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg shadow-xl transition-transform transform hover:scale-105">
              Explore Movies
            </button>
          </Link>
          <Link href="/request-movies">
            <button className="bg-white text-gray-900 font-semibold py-3 px-8 rounded-lg shadow-xl transition-transform transform hover:scale-105 hover:bg-gray-200">
              Request An Movie
            </button>
          </Link>
        </div>
      </div>

      {/* Cinematic Gradient at Bottom */}
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
}

export default HeroSection;
