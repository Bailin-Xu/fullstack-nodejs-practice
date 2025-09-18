// src/App.jsx
import { useState } from 'react'

const App = () => {
    // 1) 组件状态：通讯录列表 & 输入框内容
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' },
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    // 2) 表单提交：把输入框里的名字加入 persons
    const handleSubmit = (e) => {
        e.preventDefault()                   // 阻止表单默认刷新
        const name = newName.trim()
        const number = newNumber.trim()
        if (persons.some(p => p.name === name)) {
            alert(`${name} is already added to phonebook`)
            return
        }
        const newPerson = { name, number }
        setPersons(prev => prev.concat(newPerson)) // 不可变更新
        setNewName('')                       // 清空输入框
        setNewNumber('')                     // 清空输入框
    }

    // 3) 受控输入：保持 input 值与状态同步
    const handleNameChange = (e) => setNewName(e.target.value)
    const handleNumberChange = (e) => setNewNumber(e.target.value)
    const handleFilterChange = (e) => setFilter(e.target.value)

    const personsToShow =
        filter.trim() === ''
            ? [] // 如果过滤条件是空，就返回空数组
            : persons.filter(p =>
                p.name.toLowerCase().includes(filter.toLowerCase())
            )
    return (
        <div>
            <h2>Phonebook</h2>
            <form>
                <div>
                    filter shown with: <input value={filter}
                        onChange={handleFilterChange}
                    />
                </div>
            </form>
            <ul>
                {personsToShow.map(p => (
                    <li key={p.name}>{p.name} {p.number}</li>
                ))}
            </ul>
            <h2>add a new</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    name:{' '}
                    <input
                        value={newName}
                        onChange={handleNameChange}
                        placeholder="type a name"
                    />
                </div>
                <div>
                    number:{' '}
                    <input
                        value={newNumber}
                        onChange={handleNumberChange}
                        placeholder="type a number"
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>

            {/* 调试：随时看到输入框里的状态 */}
            <div>debug: {newName}</div>

            <h2>Numbers</h2>
            <ul>
                {persons.map(p => (
                    <li key={p.name}>{p.name} {p.number}</li>
                ))}
            </ul>
        </div>
    )
}

export default App
