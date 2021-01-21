const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    Guild: String ,
    PermissaoAv: Number,
})

module.exports = mongoose.model('permissaomod', Schema)