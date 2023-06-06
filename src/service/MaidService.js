import db from "../models/index.js";
const { Op } = require("sequelize");
import Sequelize from "sequelize";
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
}

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
        }
      ],
    });
    return maid;
  } catch (error) {
    
  }
}

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
        }
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
            [Op.like]: Sequelize.literal(`\'${name}%\'`) //sea
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

const findMaidByPage = async (page,limit) => {
    let offset = (page - 1) * limit;
    try {
        let { count, rows } = await db.Maid_profile.findAndCountAll({
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
                }
            ],
            offset: offset,
            limit: limit,
            oder: [['last_name', 'DESC']]
        });
        let totalPage = Math.ceil(count / limit);
        return {
            EC: 200,
            EM: "Get maid list successfully",
            DT: {
                totalPage: totalPage,
                maidList:rows,
                totalRows:count
            }
        };
    } catch (error) {
        console.log(error);
    }
}

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
    return {
      EC: 200,
      EM: "Get maid list successfully",
      DT: maidList,
    };
  } catch (error) {
    
  }
}


module.exports = {
  getMaidList,
  findMaidByLikeName,
  findMaidByPage,
  findMaidByLanguage,
  getMaidbyId,
};
