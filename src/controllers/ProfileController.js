const connection = require('../database/connection')

module.exports = {
    async index(request, response){
        const ong_email = request.headers.email

        const incidents = await connection('incidents')
        .where('ong_email', ong_email)
        .select('*')

        return response.json(incidents)
    }
}