import React, { useState, useEffect } from "react";
import AddPersonForm from "./AddPersonForm";
import Search from "./Search";
import DisplayPersons from "./DisplayPersons";
import personService from "../services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [nameSearch, setNewNameSearch] = useState("");

  useEffect(() => {
    personService.getAll().then(initialPersons => setPersons(initialPersons));
  }, []);

  const handleNameSearchChange = (event) => {
    setNewNameSearch(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value);
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(nameSearch.toLowerCase())
  );

  const addName = (event) => {
    event.preventDefault();
    const newNameObject = {
      name: newName,
      number: newPhoneNumber,
    };
    const nameExists = persons.some((item) => item.name === newName);
    if (!nameExists) {
      personService.createNewPerson(newNameObject).then((returnedPersons) => {
      setPersons(persons.concat(returnedPersons))
      })
    } else {
      window.alert(`Sorry, the name "${newName}" already exists!`);
    }
    setNewName(""); //clear new name state
    setNewPhoneNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Search
        nameSearch={nameSearch}
        handleNameChange={handleNameSearchChange}
      />
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
