import React from 'react'
import ReactDOM from 'react-dom'


const Course = (props) => {
  return <h1>{props.courseName}</h1>
}

const Content = (props) => {
  return <p>{props.coursePart} {props.courseExercise}</p>
}

const CourseTotal = (props) => {
  return <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14


  return (
    <div>
      <Course courseName={course} />
      <Content coursePart={part1} courseExercise={exercises1} />
      <Content coursePart={part2} courseExercise={exercises2} />
      <Content coursePart={part3} courseExercise={exercises3} />
      <CourseTotal exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))