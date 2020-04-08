const generateUniqueId = require('../utils/generateUniqueId')
const bcrypt = require('bcryptjs')
const connection = require('../database/connection')
const generateToken = require('../utils/generateToken')

module.exports = {
    async index(request, response) {
        const ongs = await connection('ongs').select('*')
        return response.json(ongs)
    },

    async create(request, response) {
        const {name, email, password, whatsapp, city, uf} = request.body

        const ong = await connection('ongs')
        .where('email', email)
        .first()

        const id = generateUniqueId()

        if (ong) {return response.status(400)
            .json({error: 'One ONG found with this email'})}
            
        const passwordCript = await bcrypt.hash(password, 10)
        await connection('ongs').insert({
            id, name, email, 
            password: passwordCript,
             whatsapp, city, uf})
        const token = generateToken(id)

        return response.json({name, email, token})
    }
}