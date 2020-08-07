import React from "react";

const DisplayPersons = ({ personsToShow }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {personsToShow.map((person) => (
        <li key={person.name}>
          {person.name} - {person.number}
        </li>
      ))}
    </div>
  );
};

export default DisplayPersons;
