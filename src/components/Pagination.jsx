import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  pageSize = 6,
  onPageChange
}) => {
  if (totalPages <= 1) return null;

  const startIdx = (currentPage - 1) * pageSize + 1;
  const endIdx = Math.min(currentPage * pageSize, totalItems);

  return (
    <nav className="pagination-bar" aria-label="Notes pagination">
      <div className="pagination-range-text">
        Showing <strong>{startIdx}–{endIdx}</strong> of <strong>{totalItems}</strong> notes
      </div>

      <div className="pagination-controls">
        <button
          type="button"
          className="pagination-btn pagination-arrow tactile-btn"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous Page"
        >
          <ChevronLeft size={16} strokeWidth={2.5} />
          <span>Prev</span>
        </button>

        <div className="pagination-pills-wrap">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              className={`pagination-pill tactile-btn ${currentPage === pageNum ? 'active' : ''}`}
              onClick={() => onPageChange(pageNum)}
              aria-current={currentPage === pageNum ? 'page' : undefined}
            >
              {pageNum}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="pagination-btn pagination-arrow tactile-btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next Page"
        >
          <span>Next</span>
          <ChevronRight size={16} strokeWidth={2.5} />
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
