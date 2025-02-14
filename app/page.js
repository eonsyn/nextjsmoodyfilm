import MoviesClient from "@/majorComponent/MoviesClient";
import { Suspense } from "react";

export async function generateStaticParams() {
  // Generate static pages for first 5 pages
  const totalStaticPages = 5;
  return Array.from({ length: totalStaticPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}

export default async function MoviesList({ params }) {
  const page = params.page || "1"; // Default to page 1 if not provided

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/home?page=${page}`,
      { next: { revalidate: 600 } } // Revalidate every 10 minutes
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return (
      <Suspense fallback={<div>Loading movies...</div>}>
        <MoviesClient
          initialMovies={data.films}
          initialPage={data.currentPage}
          totalPages={data.totalPages}
        />
      </Suspense>
    );
  } catch (error) {
    console.error("Error fetching movies:", error);
    return (
      <div className="text-red-500">
        Failed to load movies. Please try again.
      </div>
    );
  }
}

export async function generateMetadata({ params }) {
  const page = params.page || "1";
  const title = `MoodyFilm - Page ${page}`;
  const description = `MoodyFilms - Discover and download movies, explore trailers, read synopses, and enjoy personalized AI-powered movie recommendations based on your mood.`;

  return {
    title,
    description,
    keywords: "movies, film list, download movies, stream movies, MoodyFilm",
    openGraph: {
      title,
      description,
      url: `https://moodyfilm.netlify.app/?page=${page}`,
      type: "website",
    },
  };
}
