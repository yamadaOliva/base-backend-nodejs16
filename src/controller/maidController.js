import {getMaidList} from "../service/MaidService.js"

const getMaidListController = async (req, res) => {
    const maidList = await getMaidList();
    return res.status(200).json(maidList);
}

module.exports = {
    getMaidListController
}