"use client";

import Masonry from "react-masonry-css";
import Card from "@/components/basicComponent/card";
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

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      router.push(`?page=${newPage}`);
      mutate();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <div className="text-center text-white mt-10">Loading Movies...</div>
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
      <Masonry
        breakpointCols={{ default: 4, 1100: 3, 768: 2, 500: 1 }}
        className="flex w-auto -ml-4"
        columnClassName="pl-4 bg-clip-padding"
      >
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie._id} className="mb-6">
              <Card {...movie} />
            </div>
          ))
        ) : (
          <p className="text-center text-white w-full">No movies found</p>
        )}
      </Masonry>

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
