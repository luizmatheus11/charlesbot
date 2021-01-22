const { readdir } = require('fs')

module.exports = class EventsLoader {
    constructor(client) {
        readdir("./src/Listeners", (err, files) => {
            if(err) throw new Error('Events Loader Error: ' + err)
            files.forEach((filename, info) => {
                const ListenerClass = require(`../Listeners/${filename}`)
                delete require.cache[require.resolve(`../Listeners/${filename}`)]
                const listener = new ListenerClass(client)
                
                console.log(' | [ ' + listener.name + ' ] ' + 'Loaded with sucess')
                client.on(listener.name, (...args) => {
                    listener.run(...args)
                })
            })
        })
    }
}