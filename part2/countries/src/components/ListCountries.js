import React from "react";

const ListCountries = ({ countryList }) => {
  const tooManyCountries = countryList.length > 10;
  const isSingleCountry = countryList.length === 1;

  if (tooManyCountries && !isSingleCountry) {
    return <p>Too many countries to display, please narrow your search</p>;
  }
  if (!tooManyCountries && !isSingleCountry) {
    return (
      <ul>
        {countryList.map((country) => (
          <li key={countryList.alpha3Code}>{country.name}</li>
        ))}
      </ul>
    );
  }
  if (isSingleCountry) {
    return (
      <section>
        <h2>{countryList[0].name}</h2>
        <p>Capital: {countryList[0].capital}</p>
        <p>Population: {countryList[0].population}</p>
        <h3>Spoken Lanugages</h3>
        <ul>
          {countryList[0].languages.map((language) => (
            <li key={language.iso639_2}>{language.name}</li>
          ))}
        </ul>
        <img src={countryList[0].flag} alt={`{Flag of ${countryList[0].name}}`} width={`250px`}></img>
      </section>
    );
  }
};

export default ListCountries;
