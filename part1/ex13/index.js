const { getFileName } = require('./helpers')
const http = require('http')
const express = require('express')
const path = require('path')
const fs = require('fs')
const axios = require('axios')

const dir = path.join('/', 'usr', 'app', 'files')

const PORT = 8080
const HOST = '0.0.0.0'

const app = express()

const server = http.createServer(app)

app.use(express.static('build'))

app.get('/api/image', async (req, res) => {
  await fetchImage()
  setTimeout(() => {
  const filePath = path.join(dir, getFileName())
    res.sendFile(filePath)
  }, 50)
})

app.get('*', (req, res) => res.sendFile(path.resolve('build', 'index.html')))

const fetchImage = async () => {
  const filePath = path.join(dir, getFileName())
  if (fs.existsSync(filePath)) return

  const writer = fs.createWriteStream(filePath)
  const response = await axios.get('https://picsum.photos/1200', {
    responseType: 'stream'
  })
  file = response.data.pipe(writer)
}

server.listen(PORT, HOST, () => {
  console.log(`Server started in port ${PORT}`)
})