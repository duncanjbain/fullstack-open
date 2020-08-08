import React, { useEffect, useState } from "react";
import axios from "axios";
import ListCountries from "./ListCountries";

const App = () => {
  const [allCountries, updateAllCountries] = useState([]);
  const [searchTerm, updateSearchTerm] = useState("");
  const [filteredCountries, updateFilteredCountries] = useState([]);


  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => updateAllCountries(response.data));
  }, []);

  const handleSearchChange = (event) => {
    updateSearchTerm(event.target.value);
    const filteredCountries = allCountries.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    updateFilteredCountries(filteredCountries);
  };

  const handleShowClick = (name) => {
    console.log('show click', name)
    const singleCountry = filteredCountries.filter((country) =>
      country.name.toLowerCase().includes(name.toLowerCase())
    );
    console.log(singleCountry)
    updateFilteredCountries(singleCountry);
  }
  
  return (
    <div>
      <header>
        <h1>Countries</h1>
      </header>
      <main>
        <section>
          <h2>Search for countries below</h2>
          Search for: <input onChange={handleSearchChange} value={searchTerm} />
        </section>
        <section>
          <ListCountries countryList={filteredCountries} handleShowClick={handleShowClick} />
        </section>
      </main>
    </div>
  );
};

export default App;
