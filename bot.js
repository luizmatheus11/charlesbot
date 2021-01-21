const Discord = require("discord.js")
const client = new Discord.Client()
const config = require('./config.json')
const mongoose = require('mongoose')
const colors = require('colors')
const fs = require('file-system')
client.commands = new Discord.Collection()
require("./functions/quote.js")
const prefix = config.prefix
const prefixSchema = require('./models/prefix')

client.prefix = async function(message) {
  let custom;
  const data = await prefixSchema.findOne({ Guild: message.guild.id}).catch(err => console.log(err))
  if(data){
    custom = data.Prefix
  } else {
    custom = prefix
  }
  return custom;
}

mongoose.connect('mongodb+srv://admin:admin@botdiscord.jw3vo.mongodb.net/charlesbot', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }).then(console.log('Conectei a database com sucesso.'.rainbow))
function loadCommands(directory = "./commands/") {
    fs.readdir(directory, (err, data) => {
        if (err) console.log("Erro no handler: " + err);
        data.forEach(file => {
            if (fs.statSync(`${directory}/${file}`).isDirectory()) {
                loadCommands(`${directory}/${file}`)
            } else {                
                const command = require(`${directory}/${file}`)
                client.commands.set(command.help.name, command)
            }
        })
    })
}
loadCommands()
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client, mongoose));
    });
});

client.login(config.token)


