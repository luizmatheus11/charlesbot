const mongoose = require('mongoose')

let Schemaa = new mongoose.Schema({
    Guild: String ,
    PermissaoMod: Number,
})

module.exports = mongoose.model('permissaomod', Schemaa)