import React from "react";

const Search = ({ nameSearch, handleNameSearchChange }) => {
  return (
    <div>
      filter names with{" "}
      <input value={nameSearch} onChange={handleNameSearchChange} />
    </div>
  );
};

export default Search;
