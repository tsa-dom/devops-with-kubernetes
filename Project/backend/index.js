const { getFileName, fetchImage } = require('./helpers')
const http = require('http')
const path = require('path')
const express = require('express')
const cors = require('cors')
const { publishTodoState } = require('./nats')

const { todos: todoModel } = require('./models/todos.js')
const { healthz } = require('./models/healthz')

const dir = path.join('/', 'usr', 'app', 'files')
const PORT = 8080
const HOST = '0.0.0.0'

const app = express()

const server = http.createServer(app)

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

app.get('/api/image', async (req, res) => {
  await fetchImage()
  setTimeout(() => {
    const filePath = path.join(dir, getFileName())
    res.sendFile(filePath)
  }, 50)
})

app.get('/api/todos', async (req, res) => {
  const todos = await todoModel.getTodos()
  res.send({ todos })
})

app.post('/api/todos', async (req, res) => {
  const todo = req.body.todo
  if (todo.length > 140) {
    console.error('The maximum length of a todo is 140:', req.body.todo)
    res.send({ error: 'failed to add a new todo' })
  } else {
    const addedTodo = await todoModel.addTodo(todo)
    console.log('Successfully added a new todo:', addedTodo.todo)
    publishTodoState(JSON.stringify(addedTodo))
    res.send({ todo: addedTodo })
  }
})

app.put('/api/todos/:id', async (req, res) => {
  const id = req.params.id
  const todo = await todoModel.setTodoAsDone(id)
  publishTodoState(JSON.stringify(todo))
  res.send(todo)
})

app.get('/api', async (req, res) => {
  res.send('This is updated properly :)')
})

app.get('/', async (req, res) => {
  res.sendStatus(200)
})

app.get('/healthz', async (req, res) => {
  const dbState = await healthz.checkHealthy()
  if (dbState && dbState.length === 1) res.sendStatus(200)
  else res.sendStatus(500)
})

app.get('*', (req, res) => res.sendFile(path.resolve('build', 'index.html')))

server.listen(PORT, HOST, () => {
  console.log(`Server started in port ${PORT}`)
})