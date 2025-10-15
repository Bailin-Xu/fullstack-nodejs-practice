import { useState } from "react"

// 一个最简单的函数式组件，接收 props 并显示名字
// Props 在子组件内是只读数据
const Hello = (props) => {
  return (
    <div>
      {/* 在 JSX 中用花括号插入 JS 表达式 */}
      <h1>Hello, {props.name}!</h1>
    </div>
  )
}

// 通过“参数解构”直接拿到 course
const Header = ({ course }) => {
  return (
    <header>
      <h1>{course}</h1>
    </header>
  )
}

// Part 组件只负责展示一小块数据（展示型/无状态组件）
const Part = ({ part }) => {
  return (
    <p>this is {part.name} and it has {part.exercises} exercises</p>
  )
}

// Content 组件接收 parts 数组，并用 map 生成多个 Part
const Content = ({ parts }) => {
  return (
    <div>
      {/* 注意：key 应使用稳定唯一的标识符，演示里暂用索引 i */}
      {parts.map((p, i) => (<Part key={i} part={p} />))}
    </div>
  )
}

// Total 组件使用 reduce 计算总练习数
const Total = ({ parts }) => {
  return (
    <div>
      <p>
        Number of exercises {
          parts.reduce((sum, x) => sum + x.exercises, 0)
        }
      </p>
    </div>
  )
}

// 顶层 App 组件，拥有本例中唯一的 state（计数器）
const App = () => {
  // useState 返回“状态值 + 更新函数”
  const [count, setCount] = useState(0)

  // 普通变量：不会随渲染而持久化（状态则会）
  const name = 'DFS'

  // 课程对象：包含标题和多个部分（parts）
  const course = {
    name: 'Half Stack application development',
    parts: [
      { name: 'Fundamentals of React', exercises: 10 },
      { name: 'Using props to pass data', exercises: 7 },
      { name: 'State of a component', exercises: 14 }
    ]
  }

  return (
    <>
      <div>
        {/* 这个 div 是计时器和 Hello 组件容器 */}
        <h1>Test timer</h1>

        {/* 表达式插值 */}
        <p>Current count: {count}</p>

        {/* 
          事件处理：传入一个函数。
          推荐：使用函数式更新拿到最新的状态，避免快速点击时读到旧的 count。
        */}
        <button
          onClick={() => {
            setCount(c => c + 1) // ✅ 更稳妥
            // console.log 使用 count + 1 可能打印“旧值+1”，
            // 想打印新值可以在 useEffect 中监听 count 或先计算 next：
            // const next = count + 1; setCount(next); console.log(next)
            console.log(`Increase button has been clicked ${count + 1}`)
          }}
        >
          Increase
        </button>

        {/* 同理，减少 1 推荐函数式更新 */}
        <button onClick={() => setCount(c => c - 1)}>
          Decrease
        </button>

        {/* 重置为 0 */}
        <button onClick={() => setCount(0)}>
          Reset
        </button>

        {/* 在 JSX 里写注释要用 {/* ... *\/} 语法，不能用 // */}
        <Hello name={name} />  {/* 变量需要用花括号 */}
        <Hello name="dfs" />   {/* 传字符串字面量用引号（单双皆可） */}
      </div>

      <div>
        {/* 通过 props 自上而下传递数据（单向数据流） */}
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    </>
  )
}

export default App
