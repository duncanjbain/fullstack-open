import React from 'react';

const SingleCountry = ({singleCountry}) => {
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
        <img src={singleCountry.flag} alt={`{Flag of ${singleCountry.name}}`} width={`250px`}></img>
      </section>
  )
}

export default SingleCountry