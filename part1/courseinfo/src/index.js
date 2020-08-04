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
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content
        course1={parts[0]}
        course2={parts[1]}
        course3={parts[2]}
      />
      <Total course1={parts[0].exercises} course2={parts[1].exercises} course3={parts[2].exercises} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
