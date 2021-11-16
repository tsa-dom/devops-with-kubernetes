const express = require('express')
const http = require('http')
const path = require('path')
const fs = require('fs')

const dir = path.join('/', 'usr', 'app', 'files')
const filePath = path.join(dir, 'pingpongs.txt')

const PORT = 5000
const HOST = '0.0.0.0'

const app = express()

const server = http.createServer(app)

let counter = 0

const getPingPongs = async () => new Promise(res => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (!err) {
      counter = Number(data) + 1
    }
    
    fs.writeFile(filePath, String(counter), 'utf8', () => {
      res()
    })
  })
})

app.get('/pingpong', async (req, res) => {
  await getPingPongs()
  res.send(`pong ${counter}`)
})

server.listen(PORT, HOST, () => {
  console.log(`Server started in port ${PORT}`)
})