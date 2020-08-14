import React from "react";

const DisplayPersons = ({ personsToShow, deleteName }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {personsToShow.map((person) => (
        <li key={person.id}>
          {person.name} - {person.number} <button onClick={() => deleteName(person.id)} key={person.id}>Delete</button>
        </li>
      ))}
    </div>
  );
};

export default DisplayPersons;
