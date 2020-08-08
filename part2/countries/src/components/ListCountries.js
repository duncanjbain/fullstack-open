import React from 'react';

const ListCountries = ({countryList}) => {
  return (
    <ul>
    {countryList.map((country) => (
      <li key={countryList.alpha3Code}>{country.name}</li>
    ))}
    </ul>
  )
}

export default ListCountries;