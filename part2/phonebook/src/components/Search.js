import React from "react";

const Search = ({ nameSearch, handleNameChange }) => {
  return (
    <div>
      filter names with{" "}
      <input value={nameSearch} onChange={handleNameChange} />
    </div>
  );
};

export default Search;
