import {getReviewsByID, createReview} from '../service/reviewService.js';

const getReviewController = async (req, res) => {
    try {
        const id = req.query.id;
        const reviews = await getReviewsByID(id);
        res.status(200).json({
            EC: 200,
            EM: 'Get reviews successfully',
            DT: reviews
        })       
    } catch (error) {
        console.log(error);
    }
}
const createReviewController = async (req, res) => {
    try {
        const review = req.body;
        const newReview = await createReview(review);
        res.status(200).json({
            EC: 200,
            EM: 'Create review successfully',
            DT: newReview
        })
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getReviewController,
    createReviewController
}