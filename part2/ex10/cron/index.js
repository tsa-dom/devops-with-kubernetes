const axios = require('axios')

const getUrl = async () => {
  const res = await axios.get('https://en.wikipedia.org/wiki/Special:Random')
  return res.request.res.responseUrl
}

const job = async() => {
  const { Client } = require('pg')
  const client = new Client()
  await client.connect()

  const url = await getUrl()
  await client.query('INSERT INTO Todos (todo) VALUES ($1);', [url])
}

job()