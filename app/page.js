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
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/home?page=${page}`
  );
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
}
export async function generateMetadata({ params }) {
  const page = params.page || "1";
  const title = `   MoodyFilm- Page ${page} `;
  const description = `Browse the latest movies on MoodyFilm. Discover and download your favorite films. Page ${page} of our movie collection.`;

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
