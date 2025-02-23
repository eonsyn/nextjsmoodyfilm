export const generateMetadata = () => ({
  title: "About MoodyFilm - AI-Powered Movie Discovery & Streaming",
  description:
    "Welcome to MoodyFilm, your ultimate destination for movie discovery, AI-driven recommendations, and seamless streaming. Explore handpicked films, retro aesthetics, and user-curated reviews.",
  keywords: [
    "MoodyFilm",
    "AI movie recommendations",
    "stream movies online",
    "best movie discovery platform",
    "classic and retro films",
    "cinematic experience",
    "film reviews and ratings",
    "movie streaming service",
  ],
  authors: [{ name: "MoodyFilm Team" }],
  robots: "index, follow",
  openGraph: {
    title: "About MoodyFilm - AI-Powered Movie Discovery & Streaming",
    description:
      "MoodyFilm offers AI-driven movie recommendations, a nostalgic retro interface, and a seamless streaming experience. Discover films that match your mood today!",
    url: "https://moodyfilm.com/about",
    siteName: "MoodyFilm",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://moodyfilm.com/assets/about-banner.jpg",
        width: 1200,
        height: 630,
        alt: "About MoodyFilm",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About MoodyFilm - AI-Powered Movie Discovery & Streaming",
    description:
      "Discover the magic of MoodyFilm! AI-powered recommendations, retro themes, and a cinematic experience like never before.",
    site: "@MoodyFilm",
    creator: "@MoodyFilm",
    // images: ["https://moodyfilm.com/assets/about-banner.jpg"],
  },
});

export default function About() {
  return (
    <section className="min-h-screen flex items-center justify-center   text-white pt-2 md:p-6">
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-10   ">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-red-500 drop-shadow-lg mb-6">
          About MoodyFilm 🎬
        </h1>

        {/* Intro Text */}
        <p className="text-lg md:text-xl text-gray-300 text-center leading-relaxed">
          Welcome to{" "}
          <span className="text-red-500 font-semibold">MoodyFilm</span> – your
          **ultimate destination for emotionally captivating films!** Discover,
          stream, and experience **movies that match your mood.**
        </p>

        {/* Features */}
        <div className="mt-10 space-y-6">
          {/* What We Offer */}
          <div className="p-6 bg-gray-800/60 rounded-xl shadow-lg border border-gray-700 hover:border-red-500 transition duration-300">
            <h2 className="text-2xl font-bold text-red-400">
              🎥 What We Offer
            </h2>
            <ul className="list-disc list-inside text-gray-300 mt-3 space-y-2">
              <li>
                🎯 **AI-powered** movie recommendations tailored to your mood.
              </li>
              <li>
                📥 **Instant access** to high-quality streaming & downloads.
              </li>
              <li>🎨 **Aesthetic UI** with immersive dark mode themes.</li>
              <li>
                ⭐ **User reviews, trending films, and personalized lists.**
              </li>
              <li>🔍 **Search & request any film effortlessly.**</li>
            </ul>
          </div>

          {/* Why Choose Us */}
          <div className="p-6 bg-gray-800/60 rounded-xl shadow-lg border border-gray-700 hover:border-red-500 transition duration-300">
            <h2 className="text-2xl font-bold text-red-400">
              🌟 Why Choose MoodyFilm?
            </h2>
            <p className="text-gray-300 mt-3">
              We bring you **handpicked cinematic gems** with an intuitive,
              user-friendly experience. Whether you're craving **thrillers,
              psychological dramas, or timeless classics**, MoodyFilm has you
              covered! 🎬🔥
            </p>
          </div>

          {/* Community Section */}
          <div className="p-6 bg-gray-800/60 rounded-xl shadow-lg border border-gray-700 hover:border-red-500 transition duration-300">
            <h2 className="text-2xl font-bold text-red-400">
              📢 Join the MoodyFilm Community
            </h2>
            <p className="text-gray-300 mt-3">
              Connect with movie lovers, share reviews, and **discover hidden
              cinematic treasures**. Stay updated with **exclusive content,
              featured films, and community picks!**
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 text-lg">Ready to explore? 🎬</p>
          <a
            href="/movie"
            className="inline-block mt-4 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300"
          >
            Browse Movies
          </a>
        </div>
      </div>
    </section>
  );
}
