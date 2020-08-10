import React from "react";
import Weather from './Weather';

const SingleCountry = ({ singleCountry }) => {
  return (
    <section>
      <h2>{singleCountry.name}</h2>
      <p>Capital: {singleCountry.capital}</p>
      <p>Population: {singleCountry.population}</p>
      <h3>Spoken Lanugages</h3>
      <ul>
        {singleCountry.languages.map((language) => (
          <li key={language.iso639_2}>{language.name}</li>
        ))}
      </ul>
      <img
        src={singleCountry.flag}
        alt={`{Flag of ${singleCountry.name}}`}
        width={`250px`}
      ></img>
      <Weather countryName={singleCountry.name}lat={singleCountry.latlng[0]} long={singleCountry.latlng[1]} />
    </section>
  );
};

export default SingleCountry;
