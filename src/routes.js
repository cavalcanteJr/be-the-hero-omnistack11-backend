const express = require('express')
const multer = require("multer");
const path = require("path");
const multerConfig = require("./middlewares/multer");
const { celebrate, Segments, Joi } = require('celebrate')

const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const authMiddleware = require('./middlewares/auth')

const routes = express.Router()

routes.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')))

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), OngController.create)

routes.post('/session', SessionController.create)

routes.use(authMiddleware)
routes.get('/ongs', OngController.index)

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(), 
    }).unknown()
}), ProfileController.index)

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}),  IncidentController.index)

// routes.post('/incidents', celebrate({
//     [Segments.HEADERS]: Joi.object({
//         authorization: Joi.string().required(), 
//     }).unknown(),
//     [Segments.BODY]: Joi.object().keys({
//         title: Joi.string().required(),
//         description: Joi.string().required(),
//         value:  Joi.number().required(),    
//     })
// }), multer(multerConfig).single("file"), IncidentController.create)

routes.post('/incidents',multer(multerConfig).single("file"), IncidentController.create)

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), IncidentController.delete)

module.exports = routes