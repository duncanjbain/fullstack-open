import React, { useState } from "react";
import AddPersonForm from "./AddPersonForm";
import Search from "./Search";
import DisplayPersons from "./DisplayPersons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [nameSearch, setNewNameSearch] = useState("");

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(nameSearch.toLowerCase())
  );

  const handleNameSearchChange = (event) => {
    setNewNameSearch(event.target.value);
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
      <Search nameSearch={nameSearch} handleNameChange={handleNameSearchChange} />
      <div>
        <h2>Phone Numbers</h2>
        <AddPersonForm
          addName={addName}
          newName={newName}
          handleNameChange={handleNameChange}
          handlePhoneNumberChange={handlePhoneNumberChange}
          newPhoneNumber={newPhoneNumber}
        />
      </div>
      <DisplayPersons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
