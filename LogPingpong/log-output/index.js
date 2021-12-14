const randomStr = require('randomstring')
const express = require('express')
const axios = require('axios')

const value = randomStr.generate(32)

const hello = process.env.MESSAGE

let strWithTime = ''

const repeat = () => {
  strWithTime = `${new Date().toISOString()}: ${value}`
  setTimeout(repeat, 5000)
}

repeat()

const app = express()

const getPongs = async () => {
  const res = await axios.get("http://pingpong.log-pingpong.svc.cluster.local/pingpong")
  return res.data
}

app.get('/', async (req, res) => {
  const pongs = await getPongs() 
  res.send(`
    <div>Version 3.2.11</div>
    <div>${hello}</div>
    <div>${strWithTime}</div>
    <div>Ping / ${pongs}</div>
  `)
})

app.get('/healthz', async (req, res) => {
  const response = await axios.get("http://pingpong.log-pingpong.svc.cluster.local/healthz")
  if (response.status === 200) {
    res.sendStatus(200)
  } else {
    res.sendStatus(500)
  }
})

const PORT = 8080
const HOST = '0.0.0.0'

app.listen(PORT, HOST)