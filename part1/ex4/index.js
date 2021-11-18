const http = require('http')

const PORT = 8080
const HOST = '0.0.0.0'

const reqListener = (req, res) => {
  res.end('Hello world\n')
}

const server = http.createServer(reqListener)

server.listen(PORT, HOST, () => {
  console.log(`Server started in port ${PORT}`)
})