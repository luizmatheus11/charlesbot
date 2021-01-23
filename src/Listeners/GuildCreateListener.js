const Event = require('../Structures/Event')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'guildCreate'
        })
    }

    run(guild) {
         
    }
}