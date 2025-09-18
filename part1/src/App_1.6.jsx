import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return <p>No feedback given</p>
  }

  return (
    <>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + neutral + bad}</p>
      <p>average {((good - bad) / (good + neutral + bad)).toFixed(2)}</p>
      <p>positive {((good) / (good + neutral + bad) * 100).toFixed(2)}%</p>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToValue = (value, setter) => {
    console.log('value now', value)
    setter(value)
  }

  return (
    <div>
      <h1> give feedback</h1>
      <Button text="good" handleClick={() => setToValue(good + 1, setGood)} />
      <Button text="neutral" handleClick={() => setToValue(neutral + 1, setNeutral)} />
      <Button text="bad" handleClick={() => setToValue(bad + 1, setBad)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App