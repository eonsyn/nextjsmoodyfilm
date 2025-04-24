export const generateMetadata = () => ({
  title: "404 Not Found - MoodyFilms",
  description:
    "Oops! The page you are looking for doesn't exist. Return to MoodyFilms home.",
  robots: "noindex, follow",
});

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white text-center p-6">
      <h1 className="text-8xl font-extrabold text-blue-400 drop-shadow-lg animate-bounce">
        404
      </h1>
      <h2 className="text-3xl font-semibold mt-4">Oops! Page Not Found</h2>
      <p className="text-gray-400 mt-2 max-w-lg">
        The page you're looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 shadow-md"
      >
        Return Home
      </Link>
    </div>
  );
}
