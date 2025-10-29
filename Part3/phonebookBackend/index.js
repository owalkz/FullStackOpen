require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3001
const Person = require('./models/person')

app.use(express.json())
app.use(cors())
morgan.token('body', function (req) {
  const body = req.body
  if (body) return JSON.stringify(body)
  else return {}
})
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :body]',
  ),
)
const distPath = path.resolve(__dirname, 'dist')
app.use(express.static(distPath))

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => response.json(persons))
})

app.get('/api/info', (request, response) => {
  const timestamp = Date.now()
  const formatted = new Date(timestamp).toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'long',
  })
  Person.find({}).then((data) => {
    return response.send(`
    <p>Phonebook has info for ${data.length} people.<p/>
    <p>${formatted}</>
    `)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then((person) => {
    if (!person)
      return response.status(404).json({ message: 'Person not found!' })
    return response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndDelete(id)
    .then(() => {
      return response.status(204).json({ message: 'Person deleted.' })
    })
    .catch((error) => {
      next(error)
    })
})

app.post('/api/persons', (request, response, next) => {
  const data = request.body
  if (data.name && data.number) {
    const person = new Person({
      name: data.name,
      number: data.number,
    })
    person
      .save()
      .then((person) => {
        return response.status(201).json({ newPerson: person })
      })
      .catch((error) => next(error))
  } else
    return response.status(400).json({ message: 'Missing name or number.' })
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findById(request.params.id)
    .then((data) => {
      if (data) {
        data.name = name
        data.number = number

        return data.save().then((updatedContact) => {
          response.json(updatedContact)
        })
      } else {
        return response.status(404).json({ message: 'Person not found.' })
      }
    })
    .catch((error) => next(error))
})

app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(errorHandler)
app.use(unknownEndpoint)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
