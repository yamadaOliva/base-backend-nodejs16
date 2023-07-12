const { Op } = require("sequelize");

const createReport = async (data) => {
  try {
    const newReport = await db.Report.create({
      user_id: data.user_id,
      reported_id: data.report_id,
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
