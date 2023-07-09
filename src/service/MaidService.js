import db from "../models/index.js";
const { Op } = require("sequelize");
import Sequelize from "sequelize";
import { a2 } from "./authService.js";
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

const findMaidByLikeName = async (name, page, limit) => {
  console.log(name);
  let offset = (page - 1) * limit;
  try {
    const { count, rows } = await db.Maid_profile.findAndCountAll({
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
      offset: +offset,
      limit: +limit,
    });
    console.log("rows", rows);
    return {
      EC: 200,
      EM: "Get maid list successfully",
      DT: {
        maidList: rows,
        totalPage: Math.ceil(count / limit),
      },
    };
  } catch (error) {
    console.log(error);
  }
};
const getPercentagesCancel = async (id) => {
  try {
    const cancel = await db.Booking.findAll({
      where: {
        booking_id: id,
        status: "	rejected",
      },
    });
    const total = await db.Booking.findAll({
      where: {
        booking_id: id,
      },
    });
    return (cancel.length / total.length) * 100;
  } catch (error) {
    console.log(error);
  }
};
const findMaidByPage = async (page, limit) => {
  let offset = (page - 1) * limit;
  const percentageCancel = [];
  try {
    let { count, rows } = await db.Maid_profile.findAndCountAll({
      include: [
        {
          model: db.User,
          attributes: ["username", "email", "active"],
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
    for (let i = 0; i < rows.length; i++) {
      let ptr = await getPercentagesCancel(rows[i].UserId);
      if (ptr == null || ptr == undefined) ptr = 0;
      percentageCancel.push(ptr);
    }

    let totalPage = Math.ceil(count / limit);
    return {
      EC: 200,
      EM: "Get maid list successfully",
      DT: {
        totalPage: totalPage,
        maidList: rows,
        totalRows: count,
        blocked: await a2(),
        percentageCancel: percentageCancel,
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
const filterMaid = async (filterField, page, limit) => {
  console.log(filterField, page, limit);
  let offset = (page - 1) * limit;
  let totalPage = 0;
  let maidList;
  try {
    console.log();
    filterField = JSON.parse(filterField);
    if (filterField.ratingIncrease)
      maidList = await db.Maid_profile.findAll({
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
        order: [["rating", "ASC"]],
      });
    else if (filterField.ratingDecrease)
      maidList = await db.Maid_profile.findAll({
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
        order: [["rating", "DESC"]],
      });
    else {
      maidList = await db.Maid_profile.findAll({
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
    console.log("asd", filterField.language);
    if (filterField.language?.status) {
      maidList = maidList.filter((maid) => {
        maid = maid.toJSON();
        console.log(maid.Languages);
        let check = false;
        for (let i = 0; i < maid.Languages.length; i++) {
          if (maid.Languages[i].language_name == filterField.language.language_name) {
            check = true;
            break;
          }
        }
        return check;
      });
    }
    let skills = [];
    if (filterField.electrical) skills.push("電子修理");
    if (filterField.food) skills.push("料理");
    if (filterField.care) skills.push("赤ちゃん世話");
    maidList = maidList.filter((maid) => {
      let maidSkill = maid.skills.split(",");
      let check = true;
      for (let i = 0; i < skills.length; i++) {
        if (!maidSkill.includes(skills[i])) {
          check = false;
          break;
        }
      }
      return check;
    });
    totalPage = Math.ceil(maidList.length / limit);
    maidList = maidList.slice(offset, offset + limit);
    return {
      EC: 200,
      EM: "Get maid list successfully",
      DT: {
        totalPage: totalPage,
        maidList: maidList,
      },
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
