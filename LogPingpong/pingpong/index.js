const express = require('express')
const http = require('http')
const config = require('./utils/config')
const { Client } = require('pg')

const PORT = 8080
const HOST = '0.0.0.0'

const app = express()

const server = http.createServer(app)

app.get('/', async (req, res) => {
  res.sendStatus(200)
})

app.get('/pingpong', async (req, res) => {
  const counter = await getPongs()
  console.log(`Pongs: ${counter}`)
  res.send(`Pongs: ${counter}`)
})

app.get('/healthz', async (req, res) => {
  const { rows } = await client.query(`SELECT NOW();`)
  if (rows.length === 1) res.sendStatus(200)
  else res.sendStatus(500)
})

server.listen(PORT, HOST, () => {
  console.log(`Server started in port ${PORT}`)
})

const client = new Client({
  user: config.PG_USER || 'postgres',
  host: config.PG_HOST || 'localhost',
  database: config.PG_DATABASE || 'postgres',
  password: config.PG_PASSWORD || 'test',
  port: config.PG_PORT || 5432,
})
client.connect()

const createPingTable = async () => {
  await client.query(`
    CREATE TABLE IF NOT EXISTS Pongs (
      id VARCHAR ( 20 ) UNIQUE NOT NULL,
      value INTEGER
    );
  `, [])
  try {
    await client.query(`INSERT INTO Pongs (id, value) VALUES ('pongs', 0) ON CONFLICT DO NOTHING;`, [])
  } catch (err) {
    console.log(err)
    setTimeout(createPingTable, 3000)
  }
}

const getPongs = async () => {
  const { rows } = await client.query(`UPDATE Pongs SET value = value + 1 WHERE id='pongs' RETURNING value;`)
  return rows[0].value
}

setTimeout(createPingTable, 3000)