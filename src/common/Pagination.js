import React from "react";

function Pagination({ range, className, handlePageNumber, paginationStyle }) {
  return (
    <div className={className}>
      {range.map((r) => (
        <div
          key={r}
          onClick={() => handlePageNumber(r)}
          style={paginationStyle(r)}
        >
          {r}
        </div>
      ))}
    </div>
  );
}
export default Pagination;
