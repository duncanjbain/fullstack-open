import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useField } from "../Hooks";

const CreateNew = (props) => {
  const history = useHistory();

  const {resetValue: resetContent, ...content} = useField("text");
  const {resetValue: resetAuthor, ...author} = useField("text");
  const {resetValue: resetInfo, ...info} = useField("text");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    history.push("/");
  };

  const resetInputFields = () =>{
    resetContent();
    resetAuthor();
    resetInfo();
    
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <button type="button" onClick={resetInputFields}>reset</button>
      </form>
    </div>
  );
};

export default CreateNew;
