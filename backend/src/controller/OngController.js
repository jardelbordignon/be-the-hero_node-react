
const conn = require('../db/connection');
const crypto = require('crypto');

module.exports = {

    async index(req, res) {
        try {
            const ongs = await conn('ongs').select('*');
            return res.json(ongs);
        } catch (error) {
            console.warn(error);
        }
    },

    async create(req, res) {
        try {
            const {name, email, whatsapp, city, uf, created_at, updated_at} = req.body;
            const id = crypto.randomBytes(4).toString('HEX');

            await conn('ongs').insert({
                id, name, email, whatsapp, city, uf, created_at, updated_at
            });

            return res.json({ id });
        } catch (error) {
            console.warn(error);
        }
    },

    async show(req, res) {
        try {
            const { id } = req.params;
            const ong = await conn('ongs').where('id', id).select('*').first();

            if(!ong)
                return res.status(400).json({error: 'Não foi encontrada uma ONG com esse ID'});
            
            return res.json(ong);
        } catch (error) {
            console.warn(error);
        }
    }, 

    async delete(req, res) {
        const { id } = req.params;
        console.log(conn('ongs').where('id', id).select('*').first());
        const ong = await conn('ongs').where('id', id).select('*').first();

        if(!ong)
            return res.status(400).json({error: 'Não foi encontrada uma ONG com esse ID'});
        
        await conn('ongs').where('id', id).delete();
        return res.status(204).send();
    }

}