import React from 'react';
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <h1>
            {props.course}
        </h1>
    )
}

const Content = (props) => {
    const parts = props.parts.split("-");
    const exercises = props.exercises.split("-");
    return (
        <>
            <p>
                {parts[0]} {exercises[0]}
            </p>
            <p>
                {parts[1]} {exercises[1]}
            </p>
            <p>
                {parts[2]} {exercises[2]}
            </p>
        </>
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
        <Content parts = {[part1,part2,part3].join("-")} exercises = {[exercises1,exercises2,exercises3].join("-")} />
        <Total total = {exercises1+exercises2+exercises3} />
      </div>
    )
  }
  
  ReactDOM.render(<App />, document.getElementById('root'))