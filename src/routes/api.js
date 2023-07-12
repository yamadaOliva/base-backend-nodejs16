import express from 'express';
import  authController from '../controller/authController.js';
import maidController from '../controller/maidController.js';
import reviewController from '../controller/reviewController.js';
import userController from '../controller/userController.js';
import requestController from '../controller/requestController.js';
import reportController from '../controller/reportController.js';
const router = express.Router();

const initAPI = (app) => {
    router.get("/", (req, res) => {
        console.log(req.body);
        return res.status(200).json(req.body);
    });
    router.post('/register', authController.registerController)
    router.post('/login', authController.loginController)
    router.post('/logout', authController.logoutController)
    router.get('/blocked', authController.blockedController)
    router.get('/unblocked', authController.unblockedController)
    //maid api
    router.get('/maid/list', maidController.getMaidListController)
    router.get('/maid/findbyname', maidController.findMaidByLikeNameController)
    router.get('/maid/findbyLanguage', maidController.findMaidByLanguageController)
    router.get('/maid/findbyid', maidController.findMaidByIdController)
    router.get('/maid/filter',maidController.filterMaidController)
    router.post('/maid/create', maidController.createProfileMaidController)
    router.post('/maid/update', maidController.updateProfileMaidController)
    router.get('/maid/price', maidController.priceFilterController)
    router.get('/maid/rating', maidController.ratingFilterController)

    router.get('/review/show',reviewController.getReviewController)
    router.post('/review/create', reviewController.createReviewController)
    router.get('/review/check', reviewController.checkIsRequestController)
    router.post('/review/like',reviewController.likeAndDislikeController)

    router.post('/user/profile',userController.updateUserProfileController)
    router.post('/user/profile/create',userController.createUserProfileController)
    router.get('/user/profile',userController.getUserProfileController)
    router.get('/user/profile/list',userController.getListUserProfilesController)

    router.post('/maid/request/create',requestController.createRequestController)
    router.get('/maid/request/list',requestController.getListRequestController)
    router.post('/maid/request/update',requestController.updateRequestController)
    router.get('/maid/request/average',requestController.getAverageRatingController)

    router.post('/report/create',reportController.createReportController)
    router.get('/report/list',reportController.getReportController)
    router.post('/report/handle',reportController.handleReportController)

    router.get('/refesh-token',authController.reLoginController)
    return app.use("/api/v1", router);
}

export default initAPI;