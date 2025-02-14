export const generateMetadata = () => ({
  title: "About Moodyfilm - Your Ultimate Movie Destination",
  description:
    "Discover Moodyfilm, your go-to platform for downloading and streaming movies. Enjoy AI-based movie recommendations and retro-styled themes for a nostalgic experience.",
  keywords: [
    "Moodyfilm",
    "movie downloads",
    "watch movies online",
    "AI movie recommendations",
    "retro movies",
    "film reviews",
    "best movie site",
  ],
  authors: [{ name: "Moodyfilm Team" }],
  robots: "index, follow",
});

export default function About() {
  return (
    <div className="min-h-screen p-6 text-white">
      <div className="w-full shadow-xl rounded-2xl p-8">
        <h1 className="text-4xl font-extrabold text-center text-blue-400 drop-shadow-lg mb-6">
          About Moodyfilm 🎬
        </h1>

        <p className="text-lg text-gray-300 text-center leading-relaxed">
          Welcome to{" "}
          <span className="text-blue-400 font-semibold">Moodyfilm</span> – your
          ultimate movie destination! We offer a seamless experience for
          downloading and streaming movies, tailored to your mood and
          preferences.
        </p>

        <div className="mt-8 space-y-6">
          <div className="p-4 bg-white/20 rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-blue-300">
              🎥 What We Offer
            </h2>
            <ul className="list-disc list-inside text-gray-300 mt-2">
              <li>AI-based movie recommendations based on your mood.</li>
              <li>One-click movie downloads for instant access.</li>
              <li>Retro-styled themes for a nostalgic feel.</li>
              <li>User reviews, ratings, and trending movie polls.</li>
              <li>Search and request your favorite movies.</li>
            </ul>
          </div>

          <div className="p-4 bg-white/20 rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-blue-300">
              🌟 Why Choose Moodyfilm?
            </h2>
            <p className="text-gray-300 mt-2">
              We are passionate about movies and strive to bring you an
              immersive, easy-to-use platform with a touch of personalization.
              Whether you're in the mood for action, comedy, or a nostalgic
              classic – Moodyfilm has something for you!
            </p>
          </div>

          <div className="p-4 bg-white/20 rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-blue-300">
              📢 Join the Moodyfilm Community
            </h2>
            <p className="text-gray-300 mt-2">
              Engage with fellow movie lovers, share reviews, and explore hidden
              gems. Follow us for updates on the latest releases and special
              features!
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-400">Ready to explore? 🎬</p>
          <a
            href="/"
            className="inline-block mt-3 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            Browse Movies
          </a>
        </div>
      </div>
    </div>
  );
}
