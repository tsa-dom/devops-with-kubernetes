const { getFileName, fetchImage } = require('./helpers')
const http = require('http')
const path = require('path')
const express = require('express')
const cors = require('cors')
const { todos: todoModel } = require('./models/todos.js')

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
  await todoModel.addTodo(req.body.todo)
  const todos = await todoModel.getTodos()
  res.send({ todos })
})

app.get('*', (req, res) => res.sendFile(path.resolve('build', 'index.html')))

server.listen(PORT, HOST, () => {
  console.log(`Server started in port ${PORT}`)
})