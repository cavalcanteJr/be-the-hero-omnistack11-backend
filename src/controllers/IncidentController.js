const connection = require('../database/connection')
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

module.exports = {
    async index(request, response) {
        const { page = 1} = request.query
        const [count] = await connection('incidents').count()

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.email', '=', 'incidents.ong_email')
        .limit(5)
        .offset((page - 1) * 5)
        .select(['incidents.*', 'ongs.name', 'ongs.email',
                'ongs.whatsapp', 'ongs.city', 'ongs.uf'])

        response.header('X-Total-Count', count['count(*)'])
        return response.json(incidents)
    },

    async create(request, response){
        const { key } = request.file
        let { keylocation: imageurl ='' } = request.file
        const {title, description, value} = request.body
        const ong_email = request.headers.email

        if (!imageurl)
            imageurl = `http://localhost:3333/files/${key}`

        const [id] = await connection('incidents').insert({
            title, description, value, ong_email, filename: key, imageurl
        })
        return response.json({id})
    },

    async delete(request, response){
        const {id} = request.params
        const ong_email = request.headers.email

        const incident = await connection('incidents')
        .where('id', id)
        .select('ong_email')
        .select('filename')
        .first()
        if (incident.ong_email !== ong_email) {
            return response.status(401)
            .json({error: 'Operatiuon not permitted'})
        }
        
        if(await connection("incidents").where('id', id).delete())
            promisify(fs.unlink)(path.resolve(__dirname, '..','..', 'tmp', 'uploads', incident.filename))

        return response.status(204).send()
    }
}