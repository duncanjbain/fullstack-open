import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  return (
    <p>{props.course} {props.exercises}</p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part course={props.course1.name} exercises={props.course1.exercises} />
      <Part course={props.course2.name} exercises={props.course2.exercises} />
      <Part course={props.course3.name} exercises={props.course3.exercises} />
    </div>
  );
};

const Total = (props) => {
  return (
    <p>
      Number of exercises is {props.course1 + props.course2 + props.course3}
    </p>
  );
};

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content
        course1={part1}
        course2={part2}
        course3={part3}
      />
      <Total course1={part1.exercises} course2={part2.exercises} course3={part3.exercises} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
