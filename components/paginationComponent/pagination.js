// Pagination.js
"use client";

import { useRouter } from "next/navigation";

const Pagination = ({ totalPages }) => {
  const router = useRouter();
  const currentPage = parseInt(router.query.page) || 1; // Get the page from URL or default to 1

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      router.push(`/?page=${newPage}`); // Update the URL with the new page number
    }
  };

  return (
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
  );
};

export default Pagination;
