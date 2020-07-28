import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ handleClick, buttonText}) => (
  <button onClick={handleClick}>{buttonText}</button>
);

const Feedback = ({ ratingType, ratingTotal }) => (
  <div>
    <p>{ratingType} : {ratingTotal}</p>
  </div>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good+1);
  }

  const handleNeutralClick = () => {
    setNeutral(neutral+1);
  }

  const handleBadClick = () => {
    setBad(bad+1);
  }

  return (
    <div>
      <div>
        <h2>Give Feedback</h2>
        <Button buttonText="Good" handleClick={handleGoodClick} />
        <Button buttonText="Neutral" handleClick={handleNeutralClick} />
        <Button buttonText="Bad" handleClick={handleBadClick} />
      </div>
      <div>
        <h2>Statisics</h2>
        <div>
          <Feedback ratingType="Good" ratingTotal={good} />
          <Feedback ratingType="Neutral" ratingTotal={neutral} />
          <Feedback ratingType="Bad" ratingTotal={bad} />
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
