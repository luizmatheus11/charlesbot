const Event = require('../Structures/Event')

module.exports = class ReadyListener extends Event {
    constructor(client) {
        super(client, {
            name: "ready"
        })
    }

    run() {
        console.log("Online owo")
    }
}