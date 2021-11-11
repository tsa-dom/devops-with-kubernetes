const http = require('http')
const express = require('express')

const PORT = 8080
const HOST = '0.0.0.0'

const app = express()

const server = http.createServer(app)

app.use(express.static('build'))
app.get('*', (req, res) => res.sendFile(path.resolve('build', 'index.html')))

server.listen(PORT, HOST, () => {
  console.log(`Server started in port ${PORT}`)
})