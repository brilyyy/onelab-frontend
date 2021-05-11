import React from "react";

const PaginationPrev = ({ onClick, disable }) => {
  return (
    <div
      className={
        "h-8 w-8 mr-1 flex justify-center items-center rounded-md " +
        (!disable
          ? " bg-gray-200 cursor-pointer hover:bg-gray-300"
          : "bg-gray-100 cursor-not-allowed hover:bg-gray-100")
      }
      onClick={!disable ? onClick : () => {}}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-chevron-left w-4 h-4"
      >
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </div>
  );
};

export default PaginationPrev;
