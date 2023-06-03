import db from '../models/index.js';

const getMaidList = async () => {
    const maidList = await db.Maid_profile.findAll();
    return maidList;
}

module.exports = {
    getMaidList
}