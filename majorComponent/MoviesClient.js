"use client";

import Card from "@/components/basicComponent/card";
import { useSearch } from "@/context/SearchContext";
import { useSearchParams, useRouter } from "next/navigation";
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
  const searchParams = useSearchParams(); // ✅ Should be inside "use client"
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

  // ✅ Ensure `movies` array is always available
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.length > 0 ? (
          movies.map((movie) => <Card key={movie._id} {...movie} />)
        ) : (
          <p className="text-center col-span-4 text-white">No movies found</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-8">
        <button
          onClick={() => handlePageChange(pageFromUrl - 1)}
          disabled={pageFromUrl === 1}
          className={`px-4 py-2 mx-1 ${
            pageFromUrl === 1
              ? "bg-gray-300 text-gray-500"
              : "bg-blue-500 text-white hover:bg-blue-600"
          } rounded`}
        >
          Previous
        </button>
        <span className="px-4 py-2 mx-1 text-white">
          Page {pageFromUrl} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(pageFromUrl + 1)}
          disabled={pageFromUrl === totalPages}
          className={`px-4 py-2 mx-1 ${
            pageFromUrl === totalPages
              ? "bg-gray-300 text-gray-500"
              : "bg-blue-500 text-white hover:bg-blue-600"
          } rounded`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
