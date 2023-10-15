require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Note = require('./models/note')


const app = express()
app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(requestLogger)

app.put('/api/notes/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true, runValidators: true, context: 'query' })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

app.get('/', (request, response) => {
  response.send('<h1>Welcome to Express Libary</h1>')
})
app.get('/api/notes', (req, res) => {
  Note.find({}).then(notes => {
    res.json(notes)
  })
})
app.get('/api/notes/:id', (request, response, next) => {
  const id = request.params.id
  Note.findById(id)
    .then(note => note ? response.json(note) : response.status(404).end())
    .catch(error => next(error))
})
app.delete('/api/notes/:id', (req, res, next) => {
  const id = req.params.id
  Note.findByIdAndDelete(id)
    .then(() => res.status(204).end())
    .catch(error => next(error))
})

app.post('/api/notes', (request, response, next) => {
  const body = request.body
  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  } 
    const note = new Note({
      content: body.content,
      important: body.important || false,
    })
    note.save()
    .then(savedNote => response.json(savedNote))
    .catch(error => next(error))

})




const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (err, req, res, next) => {
  console.error(err.message);
  if (err.name === 'CastError') {
    return res.status(400).send({ error: "malfunctioned id" })
  }
  else if(err.name === 'ValidationError'){
    return res.status(400).send({ error: err.message })
  }
  next(err)
}
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})








