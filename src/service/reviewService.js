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
module.exports = {
    getReviewsByID
}