import React, { useState } from 'react'

const Course = (props) => {
  const courseParts = () => props.course.parts.map(part => <p>{part.name} {part.exercises}</p>)
  const totalExercises = props.course.parts.map(part => part.exercises)
  const total = totalExercises.reduce((total, exercise) => { return total + exercise })
  return (
    <div>
      <h1>{props.course.name}</h1>
      {courseParts()}
      <p><strong>total of {total} exercises</strong></p>
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

  const coursesToShow = () => courses.map(course => <Course course = {course} />)

  return (
    <div>
      <h1>Web development curriculum</h1>
      {coursesToShow()}
    </div>
  )
}

export default App