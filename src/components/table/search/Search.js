import React, { useState } from "react";

const Search = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const onInputChange = (value) => {
    setSearch(value);
    onSearch(value);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Cari . . ."
        className="bg-white h-10 p-2 rounded-lg text-sm focus:outline-none border-gray-200 border-2 "
        value={search}
        onChange={(e) => onInputChange(e.target.value)}
      />
    </>
  );
};

export default Search;
