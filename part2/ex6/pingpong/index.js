const express = require('express')
const http = require('http')

const PORT = 5000
const HOST = '0.0.0.0'

const app = express()

const server = http.createServer(app)

let counter = 0

app.get('/pingpong', async (req, res) => {
  counter += 1
  res.send(`Pongs: ${counter}`)
})

server.listen(PORT, HOST, () => {
  console.log(`Server started in port ${PORT}`)
})