import db from "../models/index.js";
import { updateRating } from "./maidService.js";
const getReviewsByID = async (id) => {
  try {
    const reviews = await db.Review.findAll({
      where: {
        maid_id: id,
      },
      include: [
        {
          model: db.User,
          attributes: ["username"],
        },
        {
          model: db.Review_agreement,
          attributes: ["agreement"],
        },
      ],
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
    const avg = await getRatingAverage(review.maid_id);
    console.log("avg///////", avg);
    await updateRating(review.maid_id, avg);
    return newReview;
  } catch (error) {
    console.log(error);
  }
};

const checkIsRequest = async (maid_id, user_id) => {
  const request = await db.Booking.findOne({
    where: {
      booking_id: maid_id,
      user_id: user_id,
    },
  });

  if (!request || request.status == "pending") {
    return {
      EC: 400,
      EM: "You have not requested this maid yet",
      DT: "",
    };
  }
  return {
    EC: 200,
    EM: "",
    DT: request,
  };
};

const getRatingAverage = async (id) => {
  try {
    const reviews = await db.Review.findAll({
      where: {
        maid_id: id,
      },
    });
    let total = 0;
    reviews.forEach((review) => {
      total += review.rating;
    });
    return total / reviews.length;
  } catch (error) {
    console.log(error);
  }
};

const likeAndDislike = async (data) => {
  try {
    const check = await db.Review_agreement.findOne({
      where: {
        user_id: data.user_id,
        review_id: data.review_id,
      },
    });
    if (check) {
      await db.Review_agreement.update(
        {
          agreement: data.status,
        },
        {
          where: {
            user_id: data.user_id,
            review_id: data.review_id,
          },
        }
      );
      return {
        EC: 200,
        EM: "Done",
        DT: "",
      };
    }

    await db.Review_agreement.create({
      user_id: data.user_id,
      review_id: data.review_id,
      agreement: data.status,
    });
    return {
      EC: 200,
      EM: "Done",
      DT: "",
    };
  } catch (error) {
    console.log(error);
  }
};

const getLike = async (review_id) => {
  try {
    const like = await db.Review_agreement.findAll({
      where: {
        review_id: review_id,
        agreement: true,
      },
    });
    return like ? like.length : 0;
  } catch (error) {
    console.log(error);
  }
};

const getDislike = async (review_id) => {
  try {
    const dislike = await db.Agreement.findAll({
      where: {
        review_id: review_id,
        agreement: false,
      },
    });
    return dislike ? dislike.length : 0;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getReviewsByID,
  createReview,
  checkIsRequest,
  likeAndDislike
};
