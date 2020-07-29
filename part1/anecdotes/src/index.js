import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(props.anecdotes.length).fill(0));
  const [mostVoted, setMostVoted] = useState(NaN);

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const randomQuote = () => {
    const selectedQuote = randomIntFromInterval(0, props.anecdotes.length - 1);
    setSelected(selectedQuote);
  };

  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected] = newVotes[selected] + 1;
    setVotes(newVotes);
    const indexMostVoted = newVotes.indexOf(Math.max(...newVotes));
    setMostVoted(indexMostVoted);
  };

  


  return (
    <div>
      <h2>Anecdote of the Day</h2>
      <div>
        <p>{props.anecdotes[selected]}</p>
      </div>
      <div>
        <p>This quote has a total of {votes[selected]} votes</p>
      </div>
      <div>
        <button onClick={() => randomQuote()}>New Quote</button>
        <button onClick={() => handleVote()}>Vote for quote</button>
      </div>
      <div>
        <h2>Most Voted Anecdote of the Day</h2>
        <p>{props.anecdotes[mostVoted]}</p>
        {mostVoted>=0 && <p> with a total of {votes[mostVoted]} votes</p>}
      </div>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
