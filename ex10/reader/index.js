const express = require('express')
const randomStr = require('randomstring')
const fs = require('fs')

const value = randomStr.generate(32)


const getTimeStamp = async () => new Promise(res => {
  fs.readFile('./files/time.txt', 'utf-8', (error, data) => {
    res(data)
  })
})

const app = express()

app.get('/', async (req, res) => {
  const time = await getTimeStamp()
  const strWithTime = `${time}, ${value}`
  res.send(strWithTime)
})

const PORT = 8080
const HOST = '0.0.0.0'

app.listen(PORT, HOST)