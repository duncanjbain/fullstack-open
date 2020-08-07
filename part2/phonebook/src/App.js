import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [nameSearch, setNewNameSearch] = useState("");

  const personsToShow = showAll
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(nameSearch)
      );

  const handleNameSearchChange = (event) => {
    setNewNameSearch(event.target.value);
    setShowAll(false);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value);
  };

  const addName = (event) => {
    event.preventDefault();
    const newNameObject = {
      name: newName,
      number: newPhoneNumber,
    };
    const nameExists = persons.some((item) => item.name === newName);
    if (!nameExists) {
      setPersons(persons.concat(newNameObject)); //copy state and add new name object to end of object and set state
    } else {
      window.alert(`Sorry, the name "${newName}" already exists!`);
    }
    setNewName(""); //clear new name state
    setNewPhoneNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter names with{" "}
        <input value={nameSearch} onChange={handleNameSearchChange} />
      </div>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          phone number:{" "}
          <input value={newPhoneNumber} onChange={handlePhoneNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <div>
        <h2>Numbers</h2>
        {personsToShow.map((person) => (
          <li key={person.name}>
            {person.name} - {person.number}
          </li>
        ))}
      </div>
    </div>
  );
};

export default App;
