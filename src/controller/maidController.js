import {
  getMaidList,
  findMaidByLikeName,
  findMaidByPage,
  findMaidByLanguage,
  getMaidbyId,
} from "../service/MaidService.js";

const getMaidListController = async (req, res) => {
  console.log(req.query.page + " " + req.query.limit);
  try {
    if (req.query.page == undefined || req.query.limit == undefined) {
      const maidList = await getMaidList();
      return res.status(200).json(maidList);
    }
    const maidList = await findMaidByPage(+req.query.page, +req.query.limit);
    console.log(maidList);
    return res.status(200).json(maidList);
  } catch (error) {
    console.log(error);
  }
};

const findMaidByLikeNameController = async (req, res) => {
  const name = req.query.name;
  console.log("name controller ==>", name);
  try {
    const maidList = await findMaidByLikeName(name);
    return res.status(200).json(maidList);
  } catch (error) {
    console.log(error);
  }
};

const findMaidByLanguageController = async (req, res) => {
  const language = req.query.language;
  console.log("language controller ==>", language);
  try {
    const maidList = await findMaidByLanguage(language);
    return res.status(200).json(maidList);
  } catch (error) {
    console.log(error);
  }
};

const findMaidByIdController = async (req, res) => {
  const id = req.query.id;
  console.log("id controller ==>", id);
  try {
    const maidList = await getMaidbyId(id);
    return res.status(200).json(maidList);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getMaidListController,
  findMaidByLikeNameController,
  findMaidByLanguageController,
  findMaidByIdController,
};
