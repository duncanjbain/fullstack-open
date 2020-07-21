import React from 'react'
import ReactDOM from 'react-dom'

const Course = (props) => {
  return <h1>{props.courseName}</h1>
}

const Content = (props) => {
  console.log('props', props);
  return (
  <>
  <Part coursePartname={props.courses.parts[0].name} courseExercisesCount={props.courses.parts[0].exercises} />
  <Part coursePartname={props.courses.parts[1].name} courseExercisesCount={props.courses.parts[1].exercises} />
  <Part coursePartname={props.courses.parts[2].name} courseExercisesCount={props.courses.parts[2].exercises} />
  </>
  )
}

const Part = (props) => {
  return <p>{props.coursePartname} {props.courseExercisesCount}</p>
}

const CourseTotal = (props) => {
  console.log(props);
  return <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }


  return (
    <div>
      <Course courseName={course.name} />
      <Content courses={course} />
      <CourseTotal exercises1={course.parts[0].exercises}
                   exercises2={course.parts[1].exercises}
                   exercises3={course.parts[2].exercises} 
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))