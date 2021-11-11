const express = require('express')
const http = require('http')

const PORT = 5000
const HOST = '0.0.0.0'

const app = express()

const server = http.createServer(app)


let counter = 0

app.get('/pingpong', (req, res) => {
  counter += 1
  res.send(`pong ${counter}`)
})

server.listen(PORT, HOST, () => {
  console.log(`Server started in port ${PORT}`)
})