var express = require('express')

var app = express(express.json())

let persons =[
  { 
    "name": "Arto Hellas", 
    "number": "040-123456",
    "id": 1
  },
  { 
    "name": "Ada Lovelace", 
    "number": "39-44-5323523",
    "id": 2
  },
  { 
    "name": "Dan Abramov", 
    "number": "12-43-234345",
    "id": 3
  },
  { 
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122",
    "id": 4
  }
]

app.get('/api/persons/', (req, res) => {
  res.json(persons)
  res.status(200).end()
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  if(person) {
  res.json(person)
  res.status(200).end()
  }
  res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

app.get('/api/info', (req,res) => {
  const phonebookSize = persons.length;
  const currentDate = new Date();
  res.send(`The Phonebook has ${phonebookSize} entries and the time is ${currentDate}`)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)