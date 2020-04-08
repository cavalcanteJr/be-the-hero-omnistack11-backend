require('dotenv').config()
const jwt = require('jsonwebtoken')
module.exports = function genereteUniqueId(id){
    return jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 86400,
    })
}