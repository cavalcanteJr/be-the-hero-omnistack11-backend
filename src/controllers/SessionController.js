const connection = require('../database/connection')
const bcrypt = require('bcryptjs')
const generateToken = require('../utils/generateToken')

module.exports = {
    async create(request, response){
        const {email, password} = request.body 

        const ong = await connection('ongs')
        .where('email', email)
        .first()

        if (!ong)
            return response.status(400).json({error: 'No ONG found with this ID'})
        if (!await bcrypt.compare(password, ong.password))
            return response.status(400).json({error: 'ONG password invalid'})

        ong.password = undefined
        ong.id = undefined
        // minhaaplicaçãodoomnistack11
        const token = generateToken(ong.id)

        return response.json({name:ong.name, email, token})
    }
}