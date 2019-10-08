import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
    return (
        <button onClick = {props.onClick}>{props.text}</button>
    )
}

const Statistics = ({good, neutral, bad, score}) => {
    if (good === 0 && neutral === 0 && bad === 0) {
        return (
            <div>
                No feedback given
            </div>
        )
    }
    return (
        <div>
            <table>
                <tr>
                    <td>good</td>
                    <td>{good}</td>
                </tr>
                <tr>
                    <td>neutral</td>
                    <td>{neutral}</td>
                </tr>
                <tr>
                    <td>bad</td>
                    <td>{bad}</td>
                </tr>
                <tr>
                    <td>all</td>
                    <td>{good+bad+neutral}</td>
                </tr>
                <tr>
                    <td>average</td>
                    <td>{score/(good+neutral+bad)}</td>
                </tr>
                <tr>
                    <td>positive</td>
                    <td>{(good/(good+bad+neutral))*100} %</td>
                </tr>
            </table>
        </div>
    )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [score, setScore] = useState(0)

  const handleGood = () => {
      setGood(good+1)
      setScore(score+1)
  }
  const handleNeutral = () => {
      setNeutral(neutral+1)
  }
  const handleBad = () => {
      setBad(bad+1)
      setScore(score-1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <br />
      <br />
      <Button onClick = {handleGood} text = "good" />
      <Button onClick = {handleNeutral} text = "neutral" />
      <Button onClick = {handleBad} text = "bad" />
      <br />
      <h1>Statistics</h1>
      <br />
      <Statistics good = {good} neutral = {neutral} bad = {bad} score = {score} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)