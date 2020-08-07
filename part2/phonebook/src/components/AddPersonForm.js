import React from "react";

const AddPersonForm = ({
  addName,
  newName,
  handleNameChange,
  handlePhoneNumberChange,
  newPhoneNumber,
}) => {
  return (
    <div>
      <h3>Add Phone Number</h3>
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
    </div>
  );
};

export default AddPersonForm;
