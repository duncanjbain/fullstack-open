import React from 'react'
import ReactDOM from 'react-dom'

const Course = (props) => {
  return <h1>{props.courseName}</h1>
}

const Content = (props) => {
  console.log(props);
  return (
  <>
  <Part coursePartname={props.courses.part1.courseName} courseExercisesCount={props.courses.part1.courseExercises} />
  <Part coursePartname={props.courses.part2.courseName} courseExercisesCount={props.courses.part2.courseExercises} />
  <Part coursePartname={props.courses.part3.courseName} courseExercisesCount={props.courses.part3.courseExercises} />
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
  const course = 'Half Stack application development'

  const courseContent = {
    part1: {
      courseName: 'Fundamentals of React',
      courseExercises: 10, 
    },
    part2: {
      courseName: 'Using props to pass data',
      courseExercises: 7,
     },
    part3: {
      courseName: 'State of a component',
      courseExercises: 14,
    }
  }

  return (
    <div>
      <Course courseName={course} />
      <Content courses={courseContent} />
      <CourseTotal exercises1={courseContent.part1.courseExercises}
                   exercises2={courseContent.part2.courseExercises}
                   exercises3={courseContent.part3.courseExercises} 
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))