const { Schema } = require('mongoose')

module.exports = new Schema({
    Guild: String ,
    PermissaoMod: Array,
    PermissaoName: Array,
})
