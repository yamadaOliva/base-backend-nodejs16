import { getMaidList, findMaidByLikeName,findMaidByPage } from "../service/MaidService.js";

const getMaidListController = async (req, res) => {
  console.log(req.query.page  + " " + req.query.limit)
  try {
    const maidList = await findMaidByPage(+req.query.page, +req.query.limit);
    console.log(maidList);
    return res.status(200).json(maidList);
  } catch (error) {
    console.log(error);
  }
};

const findMaidByLikeNameController = async (req, res) => {
  const name = req.query.name;
  console.log("name controller ==>",name);
  try {
    const maidList = await findMaidByLikeName(name);
    return res.status(200).json(maidList);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getMaidListController,
  findMaidByLikeNameController,
};
