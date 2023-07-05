import db from "../models/index.js";
const { Op } = require("sequelize");
import { a1} from "./authService.js";
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
      UserId: user.id,
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
    if (!user) {
      return {
        EC: 400,
        EM: "User profile not found",
        DT: "",
      };
    }
    return {
      EC: 200,
      EM: "Get user profile successfully",
      DT: user,
    };
  } catch (error) {
    console.log(error);
  }
};

const userProfileUpdateService = async (user) => {
  try {
    const userUpdate = await db.User_profile.update(
      {
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
        address: user.address,
        city: user.city,
        country: user.country,
        description: user.description,
        avatar_url: user.avatar_url,
      },
      {
        where: {
          UserId: user.id,
        },
      }
    );
    return {
      EC: 200,
      EM: "Update user profile successfully",
      DT: "",
    };
  } catch (error) {
    console.log(error);
  }
};

const getListUserProfilesService = async (page, limit) => {
  console.log("page, limit", page, limit);
  let offset = (page-1) * limit;
  try {
    let {count,rows} = await db.User_profile.findAndCountAll(
      {
      include: [
        {
          model: db.User,
          attributes: ["username", "email"],
        },
      ],
      offset: +offset,
      limit: +limit,
      
    });
    let totalPage = Math.ceil(count / limit);
    return {
      EC: 200,
      EM: "Get list user profiles successfully",
      DT: {
        totalPage: totalPage,
        userProfiles: rows,
        totalRows: count,
        blocked : await a1()
      },
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  updateUserProfileService,
  getUserProfileService,
  userProfileUpdateService,
  getListUserProfilesService,
};
