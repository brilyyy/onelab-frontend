import React from "react";
import { BiSearchAlt } from "react-icons/bi";

const FormSearch = ({ onClick, onChange }) => {
  return (
    <>
      <div className="mb-6">
        <div className="text-gray-900 md:flex md:items-center">
          <div className="mb-1 md:mb-0 md:w-1/3">
            <label htmlFor="nama">No. RM</label>
          </div>
          <div className="md:w-2/3 md:flex-grow">
            <input
              className="w-2/3 h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
              type="text"
              name="no_rm"
              autoComplete="off"
              required
              onChange={onChange}
            />
            <button
              onClick={onClick}
              className="w-1/3 focus:outline-none text-white py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg inline-flex justify-center"
              type="button"
            >
              <BiSearchAlt />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormSearch;
