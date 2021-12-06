const { Client, Intents } = require('discord.js')
const { getNats } = require('./nats')

const run = async () => {
  const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

  client.once('ready', async () => {
    console.log('Discord Bot Ready!')

    const [sub, sc] = await getNats()

    const channel = await client.channels.fetch('917413493030916108');
    (async () => {
      for await (const m of sub) {
        const message = JSON.stringify(JSON.parse(sc.decode(m.data)), null, 2)
        channel.send('```\n' + message + '\n```')
      }
    })()
  })

  client.login(process.env.API_TOKEN)
}

run()