const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
 app.use(requestLogger)




  
  app.get('/', (request, response) => {
    response.send('<h1>Welcome to Express Libary</h1>')
  })
  app.get('/api/notes', (req, res) => {
    res.json(notes)
  })
  app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const note = notes.find(note => note.id === parseInt(id))
    
    note?response.json(note):response.status(404).end()
  })
  app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    notes = notes.filter(note => note.id !== id)
    res.status(204).end()
  })
  app.post('/api/notes', (req, res) => {
    const maxId = notes.length > 0? Math.max(...notes.map(n => n.id)): 0
    const note = req.body
    if(!note.content) {
      return res.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    note.id = maxId + 1
    notes = notes.concat(note)
    console.log(note);
    res.json(note)
  })

  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
 
  app.use(unknownEndpoint)



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})








let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]