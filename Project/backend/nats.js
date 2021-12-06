const { connect, StringCodec } = require('nats')

const publishTodoState = async (todo) => {
  const nc = await connect({ servers: process.env.NATS_URL })
  const sc = StringCodec()

  nc.publish('todos', sc.encode(todo))
  nc.drain()
}

module.exports = { publishTodoState }