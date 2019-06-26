import React from 'react';
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <h1>
            {props.course}
        </h1>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.title} {props.exercise}
        </p>
    )
}

const Total = (props) => {
    return (
        <p>
            Number of exercises {props.total}
        </p>
    )
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
        <Header course = {course} />
        <Part title = {part1} exercise = {exercises1} />
        <Part title = {part2} exercise = {exercises2} />
        <Part title = {part3} exercise = {exercises3} />
        <Total total = {exercises1+exercises2+exercises3} />
      </div>
    )
  }
  
  ReactDOM.render(<App />, document.getElementById('root'))