import React from "react";
import SingleCountry from "./SingleCountry";
import ManyCountries from "./ManyCountries";

const ListCountries = ({ countryList, handleShowClick }) => {
  const tooManyCountries = countryList.length > 10;
  const isSingleCountry = countryList.length === 1;



  
  if (tooManyCountries && !isSingleCountry) {
    return <p>Too many countries to display, please narrow your search</p>;
  }
  if (!tooManyCountries && !isSingleCountry) {
    return <ManyCountries countryList={countryList} handleShowClick={handleShowClick}/>;
  }
  if (isSingleCountry) {
    return <SingleCountry singleCountry={countryList[0]} />;
  }
};

export default ListCountries;
