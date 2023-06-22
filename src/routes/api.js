import express from 'express';
import  authController from '../controller/authController.js';
import maidController from '../controller/maidController.js';
import reviewController from '../controller/reviewController.js';
import userController from '../controller/userController.js';
const router = express.Router();

const initAPI = (app) => {
    router.get("/", (req, res) => {
        console.log(req.body);
        return res.status(200).json(req.body);
    });
    router.post('/register', authController.registerController)
    router.post('/login', authController.loginController)
    router.post('/logout', authController.logoutController)
    //maid api
    router.get('/maid/list', maidController.getMaidListController)
    router.get('/maid/findbyname', maidController.findMaidByLikeNameController)
    router.get('/maid/findbyLanguage', maidController.findMaidByLanguageController)
    router.get('/maid/findbyid', maidController.findMaidByIdController)
    router.get('/maid/filter',maidController.filterMaidController)

    router.get('/review/show',reviewController.getReviewController)
    router.post('/review/create', reviewController.createReviewController)

    router.post('/user/profile',userController.updateUserProfileController)
    router.get('/user/profile',userController.getUserProfileController)
    router.post('/user/update',userController.userProfileUpdateController)
    return app.use("/api/v1", router);
}

export default initAPI;