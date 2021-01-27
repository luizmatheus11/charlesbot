const { Schema } = require('mongoose')

module.exports = Schema({
    userId: String,
    guildId: String,
    reason: String,
    expires: Date,
    current: Boolean})