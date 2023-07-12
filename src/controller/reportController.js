import {
  createReport,
  getReport,
  handleReport,
} from "../service/reportService.js";

const createReportController = async (req, res) => {
  try {
    const newReport = await createReport(req.body);
    return res.status(200).json(newReport);
  } catch (error) {}
};

const getReportController = async (req, res) => {
  try {
    const reportList = await getReport(+req.query.page, +req.query.limit);
    return res.status(200).json(reportList);
  } catch (error) {
    console.log(error);
  }
};

const handleReportController = async (req, res) => {
  try {
    const reportList = await handleReport(req.body.id);
    return res.status(200).json(reportList);
  } catch (error) {
    console.log(error);
  }
};

module.exports= {
  createReportController,
  getReportController,
  handleReportController,
};
