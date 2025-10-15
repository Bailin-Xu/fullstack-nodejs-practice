const express = require('express')
const morgan = require('morgan')

const app = express()
// 自定义 token：打印请求体
app.use(express.json())

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(express.static('dist'))

/* ----- notes --------- */
let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2022-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2022-05-30T18:39:34.091Z",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2022-05-30T19:20:14.298Z",
        important: true
    }
]

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const note = notes.find(note => note.id === id)
    console.log(note)
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

app.post('/api/notes', (request, response) => {
    const note = request.body
    console.log(note)
    response.json(note)
})

/* ----- persons --------- */

let persons = [
    { id: 1, name: 'Arto Hellas', number: '040-123456' },
    { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
    { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' },
]

// GET all
app.get('/api/persons', (req, res) => { res.json(persons) })

// GET one
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    person ? res.json(person) : res.status(404).end()
})

// DELETE (2.14)
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
})

// POST create (2.12)
app.post('/api/persons', (req, res) => {
    const { name, number } = req.body || {}
    if (!name || !name.trim()) return res.status(400).json({ error: 'name missing' })
    if (!number || !number.trim()) return res.status(400).json({ error: 'number missing' })
    if (persons.some(p => p.name.toLowerCase() === name.trim().toLowerCase())) {
        return res.status(400).json({ error: 'name must be unique' })
    }
    const person = { id: Date.now(), name: name.trim(), number: number.trim() }
    persons = persons.concat(person)
    res.status(201).json(person)
})

// PUT update (2.15*)
app.put('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const { name, number } = req.body || {}
    const exists = persons.find(p => p.id === id)
    if (!exists) return res.status(404).end()
    const updated = { ...exists, name: name?.trim() ?? exists.name, number: number?.trim() ?? exists.number }
    persons = persons.map(p => (p.id === id ? updated : p))
    res.json(updated)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})