"use client";

import SuperAdsCard from "@/components/adComponent/SuperAdsCard";
import Card from "@/components/basicComponent/card";
import SkeletonCard from "@/components/dummy/SkeletonCard";
import { useSearch } from "@/context/SearchContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react"; 
import useSWR from "swr";

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch movies");
  return response.json();
};

export default function MoviesClient({
  initialMovies,
  initialPage,
  totalPages,
}) {
  const searchParams = useSearchParams();
  const { searchTerm } = useSearch();
  const router = useRouter();
  const pageFromUrl = parseInt(searchParams.get("page")) || initialPage;

  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/home?page=${pageFromUrl}&search=${searchTerm}`;

  const { data, error, isLoading, mutate } = useSWR(
    pageFromUrl === initialPage && !searchTerm ? null : apiUrl,
    fetcher,
    {
      fallbackData:
        pageFromUrl === initialPage ? { films: initialMovies } : undefined,
    }
  );

  useEffect(() => {
    mutate();
  }, [searchTerm, mutate]);

  const movies = data?.films || initialMovies || [];
  // const totalMovies = movies.length;

  // Define ad insertion points (spread 4 ads evenly across the list)
  const adPositions = new Set([10, 6, 4, 13]);
  const adPositionsArray = Array.from(adPositions); // Convert Set to Array

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      router.push(`?page=${newPage}`);
      mutate();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-10">
        {Array.from({ length: 16 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-600">
        <p>Error loading movies: {error.message}</p>
        <button
          onClick={() => mutate()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container min-h-screen mx-auto pt-10 px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {movies.length > 0 ? (
          movies.flatMap((movie, index) => {
            const elements = [
              <div key={movie._id} className="mb-6">
                <Card {...movie} />
              </div>,
            ];

            // Ensure <AdCard /> is always visible on all screen sizes
            if (adPositions.has(index + 1)) {
              elements.push(
                <div key={`ad-${index}`} className="mb-6">
                  <SuperAdsCard id={adPositionsArray.indexOf(index + 1)} />
                </div>
              );
            }

            return elements;
          })
        ) : (
          <p className="text-center text-white w-full">No movies found</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-8">
        <button
          onClick={() => handlePageChange(pageFromUrl - 1)}
          disabled={pageFromUrl === 1}
          className={`px-4 py-2 mx-1 rounded transition-all ${
            pageFromUrl === 1
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-red-600 text-white hover:bg-red-700"
          }`}
        >
          Previous
        </button>

        <span className="px-4 py-2 mx-2 text-white font-semibold bg-gray-800 rounded">
          Page {pageFromUrl} of {totalPages}
        </span>

        <button
          onClick={() => handlePageChange(pageFromUrl + 1)}
          disabled={pageFromUrl === totalPages}
          className={`px-4 py-2 mx-1 rounded transition-all ${
            pageFromUrl === totalPages
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-red-600 text-white hover:bg-red-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
