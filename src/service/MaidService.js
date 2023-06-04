import db from '../models/index.js';

const getMaidList = async () => {
    const maidList = await db.Maid_profile.findAll({
        include: [{
            model: db.User,
            attributes: ['username', 'email']
        }]
    });
    return {
        EC: 200,
        EM: 'Get maid list successfully',
        DT: maidList
    };
}

module.exports = {
    getMaidList
}