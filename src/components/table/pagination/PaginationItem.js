import React from "react";

const PaginationItem = ({ active = false, val, onPageChange }) => {
  return (
    <div
      className={
        "w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in rounded-md ml-1  " +
        (!active ? "bg-gray-200" : "bg-gray-100 hover:bg-gray-300")
      }
      onClick={onPageChange}
    >
      {val}
    </div>
  );
};

export default PaginationItem;
