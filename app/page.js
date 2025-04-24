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

export async function generateMetadata() {
  return {
    title: "Movies | MoodFilm",
    description:
      "Discover a wide range of movies on MoodFilm. Browse, search, and find your next favorite film. Stay updated with the latest releases and top-rated films.",
    keywords:
      "movies, latest movies, film recommendations, MoodFilm, best movies, movie search",
    openGraph: {
      title: "Explore Movies - MoodFilm",
      description:
        "Find movies of all genres on MoodFilm. Search and explore the best films with user reviews and recommendations.",
      url: "https://moodyfilm.netlify.app",
      siteName: "MoodFilm",
      images: [
        {
          url: "https://moodyfilm.netlify.app/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "MoodFilm Movies Page",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Explore Movies - MoodFilm",
      description:
        "Find your next favorite movie on MoodFilm. Browse through a collection of top-rated films with reviews and recommendations.",
      images: ["https://moodyfilm.netlify.app/og-image.jpg"],
    },
    alternates: {
      canonical: "https://moodyfilm.netlify.app",
    },
  };
}
