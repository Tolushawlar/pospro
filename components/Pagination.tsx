// components/Pagination.tsx
import React from 'react';
import { PaginationProps } from '../types/pagination';

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const getPageNumbers = () => {
    const pages = [];
    const showMax = 5; // Show maximum 5 page numbers
    
    let start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + showMax - 1);
    
    if (end - start + 1 < showMax) {
      start = Math.max(1, end - showMax + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-16 mb-24">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md ${
          currentPage === 1
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-orange-500 text-white hover:bg-orange-600'
        }`}
      >
        Previous
      </button>
      
      {getPageNumbers().map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          className={`px-3 py-1 rounded-md ${
            currentPage === pageNum
              ? 'bg-orange-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          {pageNum}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md ${
          currentPage === totalPages
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-orange-500 text-white hover:bg-orange-600'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
