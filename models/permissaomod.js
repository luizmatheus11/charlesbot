const mongoose = require('mongoose')

let Schemaa = new mongoose.Schema({
    Guild: String ,
    PermissaoMod: String,
})

module.exports = mongoose.model('permissaomod', Schemaa)