import express from 'express';
import  authController from '../controller/authController.js';
import maidController from '../controller/maidController.js';
const router = express.Router();

const initAPI = (app) => {
    router.get("/", (req, res) => {
        console.log(req.body);
        return res.status(200).json(req.body);
    });
    router.post('/register', authController.registerController)
    router.post('/login', authController.loginController)
    //maid api
    router.get('/maid/list', maidController.getMaidListController)
    router.get('/maid/findbyname', maidController.findMaidByLikeNameController)
    router.get('/maid/findbyLanguage', maidController.findMaidByLanguageController)
    return app.use("/api/v1", router);
}

export default initAPI;