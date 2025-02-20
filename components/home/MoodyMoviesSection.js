import Link from "next/link";

const movies = [
  {
    title: "🎬 Chhaava (2025)",
    description:
      "Based on the life of Maratha king Sambhaji, son of Chatrapati Shivaji Maharaj.",
    link: "/movie/67b04e6a8245b1155fbd3946/Chhaava",
  },
  {
    title: "🎬 Marco (2025)",
    description:
      "Gangster Marco and the powerful Adat family, who dominate Kerala's gold mafia.",
    link: "/movie/67af7b27b7281097641ab986/Marco",
  },
  {
    title: "🎬 Squid-Game (2021)",
    description:
      "Hundreds of cash-strapped players accept a strange invitation to compete in children's games.  ",
    link: "movie/677bddbeaec38077ad1d3642/Squid-Game-(2021)-S0-1",
  },
];

function MoodyMoviesSection() {
  return (
    <section className="w-full bg-gray-900 text-white py-16 px-6 md:px-12">
      <div className="max-w-5xl mx-auto text-center">
        {/* Section Title */}
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-red-500 drop-shadow-md">
          What Are Moody Movies?
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl mb-8 text-gray-300 leading-relaxed">
          Moody movies create an **atmospheric, emotional, and immersive
          experience**. They often feature **dark cinematography, deep
          storytelling, and an introspective tone**. These films evoke strong
          emotions—whether through **haunting visuals, intense performances, or
          thought-provoking themes**.
        </p>

        {/* Popular Genres */}
        <div className="mb-8">
          <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-red-400">
            Popular Genres of Moody Films
          </h3>
          <p className="text-gray-300 text-lg">
            🎭 <strong>Psychological Thrillers</strong> • 🎥{" "}
            <strong>Film Noir</strong> • 🎬
            <strong> Indie Dramas</strong> • 🌌{" "}
            <strong>Sci-Fi Dystopian</strong> • 🖤
            <strong> Dark Horror</strong>
          </p>
        </div>

        {/* Must-Watch Moody Films */}
        <div>
          <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-red-400">
            Must-Watch Moody Films
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {movies.map((movie, index) => (
              <Link href={movie.link}>
                <div
                  key={index}
                  className="bg-gray-800 p-6 rounded-xl cursor-pointer shadow-lg hover:bg-gray-700 
                transition duration-300 transform hover:scale-105"
                >
                  <h4 className="text-lg font-semibold">{movie.title}</h4>
                  <p className="text-sm text-gray-400">{movie.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MoodyMoviesSection;
