import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  return (
    <div>
      <p>
        {props.course1} {props.courseExercises1}
      </p>
      <p>
        {props.course2} {props.courseExercises2}
      </p>
      <p>
        {props.course3} {props.courseExercises3}
      </p>
    </div>
  );
};

const Total = (props) => {
  return (
    <p>
      Number of exercises is {props.course1} + {props.course2} + {props.course3}
    </p>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        course1={part1}
        courseExercises1={exercises1}
        course2={part2}
        courseExercises2={exercises2}
        course3={part3}
        courseExercises3={exercises3}
      />
      <Total course1={part1} course2={part2} course3={part3} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
