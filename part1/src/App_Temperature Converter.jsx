import { useState } from "react"

const Header = ({ course }) => {
  return (
    <header>
      <h1>{course}</h1>
    </header>
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
  return (
    <div>
      <Header course="Temperature Converter" />
      <TemperatureConverter />
    </div>
  )
}


export default App
