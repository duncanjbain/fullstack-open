import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phoneNumber: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");

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
      phoneNumber: newPhoneNumber,
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
        {persons.map((person) => (
          <li key={person.name}>{person.name} - {person.phoneNumber}</li>
        ))}
      </div>
    </div>
  );
};

export default App;
