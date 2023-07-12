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
    console.log("maid", maid.get({ plain: true }));
    if (!maid)
      return {
        EC: 400,
        EM: "Maid not found",
        DT: null,
      };

    return {
      EC: 200,
      EM: "Get maid successfully",
      DT: maid,
    };
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

    if (filterField.language?.status) {
      maidList = maidList.filter((maid) => {
        maid = maid.toJSON();

        let check = false;
        for (let i = 0; i < maid.Languages.length; i++) {
          if (
            maid.Languages[i].language_name ==
            filterField.language.language_name
          ) {
            check = true;
            break;
          }
        }
        return check;
      });
    }
    let skills = [];
    if (filterField.food) skills.push("food");
    if (filterField.care) skills.push("care");
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
const checkProFileMaidService = async (id) => {
  try {
    const maid = await db.Maid_profile.findOne({
      where: {
        UserID: id,
      },
    });
    if (maid) return true;
    return false;
  } catch (error) {
    console.log(error);
  }
};
const createProfileMaidService = async (data) => {
  try {
    if (await checkProFileMaidService(data.id))
      return {
        EC: 400,
        EM: "Maid profile already exists",
        DT: null,
      };
    const maid = await db.Maid_profile.create({
      UserId: data.id,
      first_name: data.first_name,
      last_name: data.last_name,
      phone_number: data.phone_number,
      address: data.address,
      city: data.city,
      country: data.country,
      description: data.description,
      experience: data.experience,
      skills: data.skills,
      ceftification: data.certification,
      skills: data.skills,
      rating: 5,
      price_per_hour: data.price_per_hour,
      avatar_url: data.avatar_url,
    });
    //save language
    data.language_name.forEach(async (language) => {
      language = language.trim();
      const ptr_language = await db.Language.findOne({
        where: {
          language_name: language,
        },
        raw: true,
      });

      await db.Maid_language.create({
        MaidProfileId: data.profile_id,
        LanguageId: ptr_language.id,
      });
    });

    return {
      EC: 200,
      EM: "Create maid profile successfully",
      DT: null,
    };
  } catch (error) {
    console.log(error);
  }
};
const updateProfileMaidService = async (data) => {
  console.log(data);
  try {
    await db.Maid_profile.update(
      {
        first_name: data.first_name,
        last_name: data.last_name,
        phone_number: data.phone_number,
        address: data.address,
        city: data.city,
        country: data.country,
        description: data.description,
        experience: data.experience,
        skills: data.skills,
        ceftification: data.certification,
        skills: data.skills,
        price_per_hour: data.price_per_hour,
        avatar_url: data.avatar_url,
      },
      {
        where: {
          UserId: data.id,
        },
      }
    );
    //save language

    data.language_name.forEach(async (language) => {
      language = language.trim();
      const ptr_language = await db.Language.findOne({
        where: {
          language_name: language,
        },
        raw: true,
      });
      console.log("ptr", ptr_language);
      const check = await db.Maid_language.findOne({
        where: {
          MaidProfileId: data.profile_id,
          LanguageId: ptr_language.id,
        },
      });
      if (!check) {
        await db.Maid_language.create({
          MaidProfileId: data.profile_id,
          LanguageId: ptr_language.id,
        });
      }
    });

    return {
      EC: 200,
      EM: "Update maid profile successfully",
      DT: null,
    };
  } catch (error) {
    console.log(error);
  }
};

const updateRating = async (maidId, rating) => {
  console.log(maidId, rating);
  try {
    await db.Maid_profile.update(
      {
        rating: rating,
      },
      {
        where: {
          id: maidId,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const priceFilter = async (page, limit) => {
  let offset = (page - 1) * limit;
  try {
    const { count, rows } = await db.Maid_profile.findAndCountAll({
      order: [["price_per_hour", "DESC"]],
      offset: +offset,
      limit: +limit,
    });
    return {
      EC: 200,
      EM: "Get maid list successfully",
      DT: {
        maidList: rows,
        totalPage: Math.ceil(count / limit),
        blocked: await a2(),
        totalRows: count,
      },
    };
  } catch (error) {
    console.log(error);
  }
};
const ratingFilter = async (page, limit) => {
  let offset = (page - 1) * limit;
  try {
    const { count, rows } = await db.Maid_profile.findAndCountAll({
      order: [["rating", "DESC"]],
      offset: +offset,
      limit: +limit,
    });
    return {
      EC: 200,
      EM: "Get maid list successfully",
      DT: {
        maidList: rows,
        totalPage: Math.ceil(count / limit),
        blocked: await a2(),
        totalRows: count,
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
  createProfileMaidService,
  updateProfileMaidService,
  updateRating,
  priceFilter,
  ratingFilter,
};
