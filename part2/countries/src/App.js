import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [allCountries, updateAllCountries] = useState([]);
  const [searchTerm, updateSearchTerm] = useState("");
  const [filteredCountries, updateFilteredCountries] = useState([]);

  const handleSearchChange = (event) => {
    updateSearchTerm(event.target.value);
    const filteredCountries = allCountries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  updateFilteredCountries(filteredCountries);
  };
  
  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => updateAllCountries(response.data));
  });

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
        <ul>
          {filteredCountries.length < 10 &&
          filteredCountries.map((country) => (
            <li key={country.name}>{country.name}</li>)
          )}
        </ul>
      </main>
    </div>
  );
};

export default App;
