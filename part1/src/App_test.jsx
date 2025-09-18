import { useState } from "react"

const Hello = (props) => {
  return (
    <div>
      <h1>Hello, {props.name}!</h1>
    </div>
  )
}

const TemperatureInput = ({ value, onChange, label }) => (
  <>
    <input value={value} onChange={onChange} /> {label}
  </>
);

const TemperatureConverter = () => {
  const [celsius, setCelsius] = useState("");

  // 转换函数
  const toFahrenheit = (c) => (c === "" ? "" : (Number(c) * 9) / 5 + 32);
  const toCelsius = (f) => (f === "" ? "" : ((Number(f) - 32) * 5) / 9);

  return (
    <>
      {/* 摄氏度输入框 */}
      <TemperatureInput
        value={celsius}
        onChange={(e) => setCelsius(e.target.value)}
        label="°C"
      />

      {/* 华氏度输入框，值由摄氏度推算 */}
      <TemperatureInput
        value={toFahrenheit(celsius)}
        onChange={(e) => setCelsius(toCelsius(e.target.value))}
        label="°F"
      />
    </>
  );
};

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
        <Hello name={name} />  {/* 变量使用 brace */}
        <Hello name='dfs' />   {/* 传递字符串常量可以使用引号，单双都可以 */}
      </div>
      <TemperatureConverter />
    </>
  )
}


export default App
