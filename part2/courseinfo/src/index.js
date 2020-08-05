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

const Course = ({courses}) => {
  return (
    <div>
    {courses.map(course =>
    <div key={course.id} >
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
    )}
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ] 

  return <Course courses={courses} />
}

ReactDOM.render(<App />, document.getElementById("root"));
