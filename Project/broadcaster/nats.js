const { connect, StringCodec } = require('nats')

const getNats = async () => {
  const nc = await connect({ servers: process.env.NATS_URL })

  const sc = StringCodec()

  const sub = nc.subscribe('todos', { queue: 'todos' })

  return [sub, sc]
}

module.exports = { getNats }