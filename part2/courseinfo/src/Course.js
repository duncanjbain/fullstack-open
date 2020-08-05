import React from 'react';

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = ({ course, exercises, id }) => {
  return (
    <p key={id}>
      {course} {exercises}
    </p>
  );
};

const Total = ({ parts }) => {
  return (
    <p>
      Total number of exercises:{" "}
      {parts.reduce((acc, curr) => acc + curr.exercises, 0)}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part course={part.name} exercises={part.exercises} id={parts.id} />
      ))}
    </div>
  );
};

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))}
    </div>
  );
};

export default Course;