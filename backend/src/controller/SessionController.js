const conn = require('../db/connection');

module.exports = {

    async create(req, res) {
        try {
            const {id} = req.body;
        
            const ong_name = await conn('ongs').where('id', id).select('name').first();
            
            if(!ong_name)
                return res.status(400).json({error: 'Não foi encontrada uma ONG com esse ID'});
            
            return res.json(ong_name); 
        } catch (error) {
            console.warn(error);
        }
          
    }

}