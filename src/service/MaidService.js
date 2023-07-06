import db from "../models/index.js";
const { Op } = require("sequelize");
import Sequelize from "sequelize";
import { a2} from "./authService.js";
const getMaidLanguage = async (maidId) => {
  try {
    const maidLanguage = await db.Maid_language.findAll({
      where: {
        MaidProfileID: maidId,
      },
      include: [
        {
          model: db.Language,
          attributes: ["language_name"],
        },
      ],
    });
    return maidLanguage;
  } catch (error) {
    console.log(error);
  }
};

const getMaidbyId = async (maidId) => {
  try {
    const maid = await db.Maid_profile.findOne({
      where: {
        UserId: maidId,
      },
      include: [
        {
          model: db.User,
          attributes: ["username", "email"],
        },
        {
          model: db.Language,
          attributes: ["language_name"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    return maid;
  } catch (error) {}
};

const getMaidList = async () => {
  try {
    const maidList = await db.Maid_profile.findAll({
      include: [
        {
          model: db.User,
          attributes: ["username", "email"],
        },
        {
          model: db.Language,
          attributes: ["language_name"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    return {
      EC: 200,
      EM: "Get maid list successfully",
      DT: maidList,
    };
  } catch (error) {
    console.log(error);
  }
};

const findMaidByLikeName = async (name) => {
  console.log(name);
  try {
    const maidList = await db.Maid_profile.findAll({
      where: {
        last_name: {
          [Op.like]: Sequelize.literal(`\'${name}%\'`), //sea
        },
      },
      include: [
        {
          model: db.User,
          attributes: ["username", "email"],
        },
      ],
    });
    return {
      EC: 200,
      EM: "Get maid list successfully",
      DT: maidList,
    };
  } catch (error) {
    console.log(error);
  }
};

const findMaidByPage = async (page, limit) => {
  let offset = (page - 1) * limit;
  try {
    let { count, rows } = await db.Maid_profile.findAndCountAll({
      include: [
        {
          model: db.User,
          attributes: ["username", "email","active"],
        },
        {
          model: db.Language,
          attributes: ["language_name"],
          through: {
            attributes: [],
          },
        },
      ],
      offset: offset,
      limit: limit,
      oder: [["last_name", "DESC"]],
    });
    let totalPage = Math.ceil(count / limit);
    return {
      EC: 200,
      EM: "Get maid list successfully",
      DT: {
        totalPage: totalPage,
        maidList: rows,
        totalRows: count,
        blocked : await a2()
      },
    };
  } catch (error) {
    console.log(error);
  }
};

const findMaidByLanguage = async (language) => {
  try {
    const maidList = await db.Maid_profile.findAll({
      include: [
        {
          model: db.User,
          attributes: ["username", "email"],
        },
        {
          model: db.Language,
          attributes: ["language_name"],
          through: {
            attributes: [],
          },
          where: {
            language_name: language,
          },
        },
      ],
    });
    return maidList;
  } catch (error) {}
};
// fdf
const filterMaid = async (filterField) => {
  let maidList = [];
  let maidList1 = [];
  let maidList2 = [];
  let maidList3 = [];
  let maidList4 = [];
  //string to json
  filterField = JSON.parse(filterField);
  try {
    if (filterField?.experience?.on == true) {
      maidList1 = await db.Maid_profile.findAll({
        where: {
          experience: {
            [Op.and]: [
              { [Op.gte]: filterField?.experience.min },
              { [Op.lte]: filterField?.experience.max },
            ],
          },
        },
        include: [
          {
            model: db.User,
            attributes: ["username", "email"],
          },
          {
            model: db.Language,
            attributes: ["language_name"],
            through: {
              attributes: [],
            },
          },
        ],
      });
    }
    if (filterField?.price?.on == true) {
      maidList2 = await db.Maid_profile.findAll({
        where: {
          price_per_hour: {
            [Op.and]: [
              { [Op.gte]: filterField?.price.min },
              { [Op.lte]: filterField?.price.max },
            ],
          },
        },
        include: [
          {
            model: db.User,
            attributes: ["username", "email"],
          },
          {
            model: db.Language,
            attributes: ["language_name"],
            through: {
              attributes: [],
            },
          },
        ],
      });
    }
    if (filterField?.rating?.on == true) {
      maidList3 = await db.Maid_profile.findAll({
        where: {
          rating: {
            [Op.and]: [
              { [Op.gte]: filterField?.rating.min },
              { [Op.lte]: filterField?.rating.max },
            ],
          },
        },
        include: [
          {
            model: db.User,
            attributes: ["username", "email"],
          },
          {
            model: db.Language,
            attributes: ["language_name"],
            through: {
              attributes: [],
            },
          },
        ],
      });
    }
    
    if (filterField?.language?.on == true)
      maidList4 = await findMaidByLanguage(filterField?.language.language);
      console.log(" 0 :" ,maidList.length);
      console.log(" 1 :" ,maidList1.length);
      console.log(" 2 :" ,maidList2.length);
      console.log(" 3 :" ,maidList3.length);
      console.log(" 4 :" ,maidList4.length);

    // find common element of 4 arrays
    if (maidList1.length > 0) maidList = maidList1;
    else if (maidList2.length > 0) maidList = maidList2;
    else if (maidList3.length > 0) maidList = maidList3;
    else if (maidList4.length > 0) maidList = maidList4;
    
    
    if (maidList1.length == 0 && !filterField.experience.on) maidList1 = maidList;
    if (maidList2.length == 0 && !filterField.price.on) maidList2 = maidList;
    if (maidList3.length == 0 && !filterField.rating.on) maidList3 = maidList;
    if (maidList4.length == 0 && !filterField.language.on) maidList4 = maidList;

    console.log(" 0 :" ,maidList.length);
    console.log(" 1 :" ,maidList1.length);
    console.log(" 2 :" ,maidList2.length);
    console.log(" 3 :" ,maidList3.length);
    console.log(" 4 :" ,maidList4.length);
    maidList = maidList.filter((value) => {
      
      return (
        maidList1.some((item) => item.UserId == value.UserId) &&
        maidList2.some((item) => item.UserId == value.UserId) &&
        maidList3.some((item) => item.UserId == value.UserId) &&
        maidList4.some((item) => item.UserId == value.UserId)
      );
    });

    return {
      EC: 200,
      EM: "successful",
      DT: maidList,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getMaidList,
  findMaidByLikeName,
  findMaidByPage,
  findMaidByLanguage,
  getMaidbyId,
  filterMaid,
};
