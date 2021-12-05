const { Pool } = require('pg')
const fs = require('fs')

const pool = new Pool()
pool.on('error', (err) => console.error(err))

fs.readFile('schema.sql', async (err, data) => {
  if (!err) {
    const query = data.toString()
    await pool.query(query)
  }
})

module.exports = { pool }