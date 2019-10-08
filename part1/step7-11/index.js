import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const History = (props) => {
    if (props.allClicks.length === 0) {
        return (
            <div>
                the app is used by pressing the buttons!
            </div>
        )
    }
    return (
        <div>
            button press history: {props.allClicks.join(' ')}
        </div>
    )
}

const Button = ({ onClick, text }) => (
    <button onClick = {onClick}>{text}</button>
)

const App = (props) => {
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [allClicks, setClicks] = useState([])
    const handleLeftClicks = () => {
        setClicks(allClicks.concat('L'))
        setLeft(left+1)
    }
    const handleRightClicks = () => {
        setClicks(allClicks.concat('R'))
        setRight(right+1)
    }
    return (
        <div>
            {left}
            <Button onClick = {handleLeftClicks} text = "left" />
            <Button onClick = {handleRightClicks} text = "right" />
            {right}
            <History allClicks = {allClicks} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA