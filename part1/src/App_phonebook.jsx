// App.jsx
import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'
import Footer from './components/Footer'

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [notification, setNotification] = useState({ message: '', type: 'success' });
    const [filter, setFilter] = useState('');

    useEffect(() => {
        personService.getAll().then(initialPersons => setPersons(initialPersons));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = newName.trim(), number = newNumber.trim();
        if (!name || !number) return;

        const existing = persons.find(p => p.name.toLowerCase() === name.toLowerCase())
        if (!existing) {
            personService.create({ name, number }).then(created => {
                setPersons(prev => prev.concat(created)) // 用后端返回的对象（含 id）
                setNewName(''); setNewNumber('')
                showNotice(`Added ${created.name}`, 'success')
            })
            return
        }
        if (window.confirm(`${name} is already added to phonebook, replace the old number with a new one?`)) {
            personService.update(existing.id, { ...existing, number }).then(updated => {
                setPersons(prev => prev.map(p => p.id !== existing.id ? p : updated))
                setNewName(''); setNewNumber('')
                showNotice(`Updated number for ${updated.name}`, 'success')
            }).catch(err => {
                showNotice(`Information of ${existing.name} has already been removed from server`, 'error')
                setPersons(prev => prev.filter(p => p.id !== existing.id))
            })
        };
    }

    const handleDelete = (person) => {
        if (!window.confirm(`Delete ${person.name}?`)) return;
        personService.remove(person.id).then(() => {
            setPersons(prev => prev.filter(p => p.id !== person.id))
        })
    }

    const showNotice = (message, type = 'success', delay = 5000) => {
        setNotification({ message, type })
        setTimeout(() => setNotification({ message: '', type }), delay)
    }

    const personsToShow = filter.trim() === ''
        ? persons
        : persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notification.message} type={notification.type} />
            <Filter value={filter} onChange={e => setFilter(e.target.value)} />

            <h3>Add a new</h3>
            <PersonForm
                onSubmit={handleSubmit}
                name={newName}
                onNameChange={e => setNewName(e.target.value)}
                number={newNumber}
                onNumberChange={e => setNewNumber(e.target.value)}
            />

            <h3>Numbers</h3>
            <Persons persons={personsToShow} onDelete={handleDelete} />
            <Footer />
        </div>
    );
}

export default App;
