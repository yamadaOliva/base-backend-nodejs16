import {registerService} from '../service/authService.js';

const registerController = async (req, res) => {
    const user = req.body;
    console.log(req.body);
    const result = await registerService(user);
    return res.status(result.EC).json(result);
}

module.exports = {
    registerController
}