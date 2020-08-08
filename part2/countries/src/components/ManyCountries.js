import React from "react";

const ManyCountries = ({ countryList, handleShowClick }) => {
  return (
    <ul>
      {countryList.map((country) => (
        <li key={country.name}>
          {country.name}{" "}
          <button
            key={country.alpha3Code}
            onClick={() => handleShowClick(country.name)}
          >
            Show
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ManyCountries;
