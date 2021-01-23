const { Client, Collection } = require('discord.js')
const Loaders = require('./Loaders')
const BotDatabase = require('./Database/BotDatabase')

module.exports = class BotClient extends Client {
    constructor(options = {}) {
        super();
        this.token = options.token;
        this.settings = {
            mongo: options.mongo
        }

        this.commands = new Collection()
        this.aliases = new Collection()
        this.cooldowns = new Collection()

        this.database = new BotDatabase(this.settings.mongo)
    } 

    start() {
        this.initLoaders()
        super.login(this.token)
        return this;
    }

    initLoaders() {
        for(const Loader of Object.values(Loaders)) {
            new Loader(this)
        }
    }
}