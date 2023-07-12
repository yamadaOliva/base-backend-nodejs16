const { Op } = require("sequelize");
import db from "../models/index.js";

const checkIsExist = async (user_id, report_id) => {
  try {
    const report = await db.Report.findOne({
      where: {
        user_id: user_id,
        report_id: report_id,
      },
    });
    if (report) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
  }
};

const createReport = async (data) => {
  console.log(data);
  try {
    if(await checkIsExist(data.user_id, data.reported_id)){
      return {
        EC: 400,
        EM: "レポートは存在します",
        DT: "",
      };
    }
    const newReport = await db.Report.create({
      user_id: data.user_id,
      report_id: data.reported_id,
      reason: data.reason,
      is_handled: false,
    });
    return {
      EC: 200,
      EM: "Report maid successfully",
      DT: "",
    };
  } catch (error) {
    console.log(error);
  }
};

const getReport = async (page, limit) => {
  try {
    const { count, rows } = await db.Report.findAndCountAll({
      where: {
        is_handled: false,
      },
      include: [
        {
          model: db.User,
          as: "user",
          attributes: ["username"],
        },
        {
          model: db.User,
          as: "reported",
          attributes: ["username"],
        },
      ],
    });
    return {
      EC: 200,
      EM: "Get report list successfully",
      DT: {
        reportList: rows,
        totalPage: Math.ceil(count / limit),
      },
    };
  } catch (error) {
    console.log(error);
  }
};

const handleReport = async (id) => {
  try {
    await db.Report.update(
      {
        is_handled: true,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return {
      EC: 200,
      EM: "Handle report successfully",
      DT: "",
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createReport,
  getReport,
  handleReport,
};
