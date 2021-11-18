const randomStr = require('randomstring')
const http = require('http')
const express = require('express')

const value = randomStr.generate(32)

let strWithTime = ''

const repeat = () => {
  strWithTime = `${new Date().toISOString()}, ${value}`
  setTimeout(() => repeat(), 5000)
}

repeat()

const app = express()
app.get('/', (req, res) => {
  res.send(strWithTime)
})

const PORT = 8080
const HOST = '0.0.0.0'

app.listen(PORT, HOST)