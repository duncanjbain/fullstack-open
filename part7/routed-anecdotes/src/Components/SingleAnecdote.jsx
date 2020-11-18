import React from "react";

const SingleAnecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>Anecdote</h2>
      <h3>
        {anecdote.content} by {anecdote.author}
      </h3>
      <p>has {anecdote.votes} votes.</p>
      <p>
        for more information see <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </div>
  );
};

export default SingleAnecdote;
