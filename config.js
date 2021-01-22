require('dotenv').config();

module.exports = {
    token: process.env.TOKEN,
    mongo: process.env.MONGO_URI
}