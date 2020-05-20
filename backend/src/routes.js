const express = require('express');

const IncidentController = require('./controller/IncidentController');
const OngController = require('./controller/OngController');
const ProfileController = require('./controller/ProfileController');
const SessionController = require('./controller/SessionController');


const routes = express.Router();

/*
Tipos de parametros
Query Params: Parametros nomeados enviados na rota após ?
Route Params: Parametros para identificar recursos
Request Body: Corpo da request, para criar ou editar registro
Response Body
*/

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);
routes.get('/ongs/:id', OngController.show);
routes.delete('/ongs/:id', OngController.delete);

routes.get('/profile', ProfileController.index);

routes.post('/sessions', SessionController.create);

module.exports = routes;
