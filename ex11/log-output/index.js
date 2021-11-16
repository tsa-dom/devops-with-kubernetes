const randomStr = require('randomstring')
const fs = require('fs')
const path = require('path')
const express = require('express')

const dir = path.join('/', 'usr', 'app', 'files')
const filePath = path.join(dir, 'pingpongs.txt')

const value = randomStr.generate(32)

let strWithTime = ''

const repeat = () => {
  strWithTime = `${new Date().toISOString()}, ${value}`
  setTimeout(() => repeat(), 5000)
}

repeat()

const app = express()

const getPongs = async () => new Promise(res => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    let pongs = 0
    if (!err) {
      pongs = Number(data)
    }

    res(pongs)
  })
})

app.get('/', async (req, res) => {
  const pongs = await getPongs() 
  res.send(`
    <div>${strWithTime}</div>
    <div>Ping / Pongs: ${pongs}</div>
  `)
})

const PORT = 8080
const HOST = '0.0.0.0'

app.listen(PORT, HOST)