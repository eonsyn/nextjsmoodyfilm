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
  const title = "MoodyFilm - Discover & Stream Movies Based on Your Mood";
  const description =
    "MoodyFilm is your ultimate destination for discovering, streaming, and downloading movies based on your mood. Explore trailers, read detailed synopses, and enjoy personalized movie recommendations with AI-powered suggestions.";

  return {
    title,
    description,
    keywords:
      "movies, film streaming, AI movie recommendations, mood-based movie suggestions, download movies, movie trailers, personalized film list, movie genres, best films, stream movies online, watch films, film recommendations, movie downloads, new releases",
    openGraph: {
      title,
      description,
      url: "https://moodyfilm.netlify.app",
      type: "website",
      images: [
        {
          url: "https://moodyfilm.netlify.app/og-image.jpg", // Provide a relevant image for the Open Graph preview
          width: 1200,
          height: 630,
          alt: "MoodyFilm - Discover and Stream Movies Based on Your Mood",
        },
      ],
    },
    twitter: {
      card: "summary_large_image", // Twitter card type (large image summary for better display)
      title,
      description,
      image: "https://moodyfilm.netlify.app/og-image.jpg", // Same as Open Graph image or different
    },
    robots: {
      index: true, // Allow indexing
      follow: true, // Allow crawling of links
    },
    canonical: "https://moodyfilm.netlify.app", // Canonical URL for SEO
    author: "MoodyFilm Team",
    publisher: "MoodyFilm",
    language: "en-US", // Specify language for better localization
    charset: "UTF-8", // Set charset to UTF-8
    googleSiteVerification: "a519RGXXnU8_HDFGvb_9NLkro6BAy_BnCXPq8fhFTkY", // Optional, for Google search console
    additionalMetaTags: [
      {
        property: "og:locale",
        content: "en_US",
      },
      {
        property: "og:site_name",
        content: "MoodyFilm",
      },
      {
        property: "og:type",
        content: "website",
      },
    ],
    additionalLinkTags: [
      {
        rel: "icon",
        href: "/favicon.ico",
      },

      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap", // Example Google Font
      },
    ],
  };
}
