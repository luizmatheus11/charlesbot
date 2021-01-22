const BotClient = require('./src/BotClient')
const config = require('./config')
const client = new BotClient(config)

client.start()