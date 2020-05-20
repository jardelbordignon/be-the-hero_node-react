
const conn = require('../db/connection');

module.exports = {

    async index(req, res) {
        const { page = 1 } = req.query;

        const [count] = await conn('incidents').count();
        //console.log(count);

        const ongs = await conn('incidents')
        //.join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select('*');

        res.header('X-Total-Count', count['count(*)']); // informando no header o total de registros

        return res.json(ongs);
    },

    async create(request, response) {
        try {
            console.log(request.body);

            const {title, description, value} = request.body;
            const ong_id = request.headers.authorization;

            const [id] = await conn('incidents').insert({ title, description, value, ong_id, });

            return response.json({ id });
        } catch (error) {
            console.warn(error);
        }        
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const ong_id = req.headers.authorization;
            const incident = await conn('incidents').where('id', id).select('ong_id').first();

            if(incident.ong_id != ong_id) 
                return res.status(401).json({error: 'Operação não permitida'});
            
            await conn('incidents').where('id', id).delete();
            return res.status(204).send();
        } catch (error) {
            console.warn(error);
        }
    }

}