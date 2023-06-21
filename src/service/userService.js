import db from "../models/index.js";
const { Op } = require("sequelize");
const checkUserProfileExists = async (id) => {
  try {
    const user = await db.User_profile.findOne({
      where: {
        UserID: id,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
  }
};

const updateUserProfileService = async (user) => {
  try {
    console.log("user=>>", user);
    const userTemp = await checkUserProfileExists(user.id);
    console.log("userTemp=>>", userTemp);
    if (userTemp) {
      return {
        EC: 400,
        EM: "User profile already exists",
        DT: userTemp,
      };
    }
    const userUpdate = await db.User_profile.create({
      UserID: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
      address: user.address,
      city: user.city,
      country: user.country,
      description: user.description,
      avatar_url: user.avatar_url,
    });
    return {
      EC: 200,
      EM: "Update user profile successfully",
      DT: "",
    };
  } catch (error) {
    console.log(error);
  }
};

const getUserProfileService = async (id) => {
  try {
    const user = await db.User_profile.findOne({
      where: {
        UserID: id,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  updateUserProfileService,
  getUserProfileService,
};
