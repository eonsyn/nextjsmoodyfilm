"use client";

import Card from "@/components/basicComponent/card";
import { useSearch } from "@/context/SearchContext";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import useSWR from "swr";
import "../styles/globals.css";

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch movies");
  return response.json();
};

function MoviesList() {
  const searchParams = useSearchParams();
  const { searchTerm } = useSearch();
  const pageFromUrl = parseInt(searchParams.get("page")) || 1;

  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/home?page=${pageFromUrl}&search=${searchTerm}`,
    fetcher
  );

  const movies = data?.films || [];
  const currentPage = data?.currentPage || pageFromUrl;
  const totalPages = data?.totalPages || 1;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      window.history.pushState(null, "", `?page=${newPage}`);
      mutate(); // Re-fetch data when page changes
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <div className="mx-5 text-center mt-[2rem]">
        <h1 className="text-3xl font-bold text-center text-gray-900 text-white mb-8">
          Loading Movies...
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="aspect-w-16 aspect-h-9 bg-gray-200 shadow-lg rounded-lg overflow-hidden animate-pulse h-[450px]"
            />
          ))}
        </div>
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
    <div className="container min-h-screen mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center text-gray-900 text-white mb-8">
        Movie Library
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.length > 0 ? (
          movies.map((movie) => <Card key={movie._id} {...movie} />)
        ) : (
          <p className="text-center col-span-4">No movies found</p>
        )}
      </div>
      <div className="flex justify-center items-center mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-1 ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500"
              : "bg-blue-500 text-white hover:bg-blue-600"
          } rounded`}
        >
          Previous
        </button>
        <span className="px-4 py-2 mx-1 text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 mx-1 ${
            currentPage === totalPages
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

export default function Page() {
  return (
    <Suspense fallback={<p className="text-center text-white">Loading...</p>}>
      <MoviesList />
    </Suspense>
  );
}
