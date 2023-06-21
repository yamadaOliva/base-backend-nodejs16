import db from "../models/index.js";

const getReviewsByID = async (id) => {
  try {
    const reviews = await db.Review.findAll({
      where: {
        maid_id: id,
      },
      include: {
        model: db.User,
        attributes: ["username"],
      },
    });
    return reviews;
  } catch (error) {
    console.log(error);
  }
};

  const createReview = async (review) => {
    try {
      const newReview = await db.Review.create({
        maid_id: review.maid_id,
        UserId: review.UserId,
        review: review.review,
        rating: review.rating,
        comment: review.comment,
      });
      return newReview;
    } catch (error) {
      console.log(error);
    }
  };
module.exports = {
    getReviewsByID,
    createReview
}