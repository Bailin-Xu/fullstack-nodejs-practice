import { useState } from "react"

const Hello = (props) => {
  return (
    <div>
      <h1>Hello, {props.name}!</h1>
    </div>
  )
}
const Header = ({ course }) => {
  return (
    <header>
      <h1>{course}</h1>
    </header>
  )
}

const Part = ({ part }) => {
  return (
    <p>this is {part.name} and it has {part.exercises} exercises</p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((p, i) => (<Part key={i} part={p} />))}
    </div>
  )
}

const Total = ({ parts }) => {
  return (
    <div>
      <p>Number of exercises {parts.reduce((sum, x) => sum + x.exercises, 0)}</p>
    </div>
  )
}

const App = () => {
  const [count, setCount] = useState(0)
  const name = 'DFS'
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
    <>
      <div> {/* 这个 div 是计时器和一个简易的 Hello 组件容器 */}
        <h1>Test timer</h1>
        <p>Current count：{count}</p>
        <button onClick={() => {
          setCount(count + 1)
          console.log(`Increase button has been clicked ${count + 1}`)
        }}>Increase</button>
        <button onClick={() => setCount(count - 1)}>Decrease</button>
        <button onClick={() => setCount(0)}>Reset</button>
        <Hello name={name} />  //变量使用 brace
        <Hello name='dfs' />   //传递字符串常量可以使用引号，单双都可以
      </div>
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    </>
  )
}


export default App
