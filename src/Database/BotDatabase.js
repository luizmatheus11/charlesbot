const { connect, model } = require('mongoose')

module.exports = class BotDatabase {
    constructor(uri) {
        connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, autoIndex: false }, e => {
            if(e) throw new Error("Mongoose Error: " + e)
            console.log(`Database by MongoDB`)
        })

        return {
            ...this,
            permissaoav: model("permissaoav", require('./Models/permissaoav')),
            prefix: model("prefix", require('./Models/prefix')),
            permissaomod: model('permissaomod', require('./Models/permissaomod')),
            muted: model('muted', require('./Models/muted'))
        }
    }
}