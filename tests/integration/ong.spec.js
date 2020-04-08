const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')
describe('ONG', () => {

    beforeEach(async () => {
        await connection.migrate.rollback()
        await connection.migrate.latest()
    })

    afterAll(async () => {
        await connection.destroy()
    })

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
        .post('/ongs')
        .send({
            name: "HERO AM", 
            email: "contato@gmail.com",
            password: "123456",
	        whatsapp: "1236547894", 
	        city: "Manaus", 
	        uf: "AM"
        })

        expect(response.statusCode).toBe(200)
    })
    it('should be able to LOGIN', async () => {
        const ong = await request(app)
        .post('/ongs')
        .send({
            name: "HERO AM", 
            email: "contato@gmail.com",
            password: "123456",
	        whatsapp: "1236547894", 
	        city: "Manaus", 
	        uf: "AM"
        })

        const response = await request(app)
        .post('/session')
        .send({
            email: "contato@gmail.com",
            password: "123456"
        })
        expect(response.statusCode).toBe(200)
    })
    it('create new incident', async () => {
        const ong = await request(app)
        .post('/ongs')
        .send({
            name: "HERO AM", 
            email: "contato@gmail.com",
            password: "123456",
	        whatsapp: "1236547894", 
	        city: "Manaus", 
	        uf: "AM"
        })

        const response = await request(app)
        .post('/incidents')
        .set({
            authorization: `Bearer ${ong.body.token}`,
            email: ong.body.email
        })
        .send({
            title: "Novo caso",
            description: "Detalhes do caso",
            value: 120
        })
        expect(response.statusCode).toBe(200)


    })
})