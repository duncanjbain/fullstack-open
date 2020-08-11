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
  const [reloadPersons, setReloadPersons] = useState(false);

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, [reloadPersons]);

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
        setPersons(persons.concat(returnedPersons));
      });
    } else {
      if (
        window.confirm(
          `Sorry, the name "${newName}" already exists! Do you wish to update the existing number?`
        )
      ) {
        const person = persons.find((p) => p.name === newName);
        const personId = person.id;
        personService
          .updatePerson(personId, newNameObject)
          .then((returnedPersons) => {
            setPersons(
              persons.map((person) =>
                person.name !== personId ? person : returnedPersons
              )
            );
          });
        setReloadPersons(true);
      }
    }

    setNewName(""); //clear new name state
    setNewPhoneNumber("");
  };

  const deleteName = (personID) => {
    if (window.confirm("Delete this person?")) {
      personService.deletePerson(personID).then(setReloadPersons(true));
    }
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
      <DisplayPersons personsToShow={personsToShow} deleteName={deleteName} />
    </div>
  );
};

export default App;
