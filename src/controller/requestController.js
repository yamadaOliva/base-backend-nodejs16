import {createRequest} from '../service/requestService';
const createRequestController = async (req, res) => {
    const request = req.body;
    console.log("request =>",request);
    try {
        const result = await createRequest(request);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createRequestController
}