//sceed_frontend/src/components/pagination.js

// sceed_frontend/src/components/pagination.js

import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center space-x-2 mt-2 mb-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 disabled:bg-gray-100 disabled:text-gray-400 hover:bg-gray-300 transition-colors">
        Previous
      </button>

      <div className="flex space-x-1">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 rounded-md transition-colors ${
              currentPage === page
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}>
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 disabled:bg-gray-100 disabled:text-gray-400 hover:bg-gray-300 transition-colors">
        Next
      </button>
    </div>
  );
};

export default Pagination;
