import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = ({course, exercises, id}) => {
  return (
    <p key={id}>
      {course} {exercises}
    </p>
  );
};

const Total = ({parts}) => {
  return(
    <p>Total number of exercises: {parts.reduce((acc, curr) => acc+curr.exercises,0 )}</p>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part => 
      <Part course={part.name} exercises={part.exercises} id={parts.id} />
      )}
    </div>
  );
};

const Course = ({course}) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById("root"));
