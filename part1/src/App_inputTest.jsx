import { useState, useRef } from 'react'

function ControlledExample() {
  const [text, setText] = useState('')

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
      <h3>受控输入框</h3>
      <input
        value={text}   // 输入框始终由 state 控制
        onChange={(e) => setText(e.target.value)}
        placeholder="请输入内容"
      />
      <p>当前 state: {text}</p>
    </div>
  )
}

function UncontrolledExample() {
  const inputRef = useRef()

  const handleShowValue = () => {
    alert(`输入框内容是: ${inputRef.current.value}`)
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px' }}>
      <h3>非受控输入框</h3>
      <input ref={inputRef} placeholder="请输入内容" />
      <button onClick={handleShowValue} style={{ marginLeft: '10px' }}>
        显示当前内容
      </button>
    </div>
  )
}

function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h2>React 输入框对比</h2>
      <ControlledExample />
      <UncontrolledExample />
    </div>
  )
}

export default App
