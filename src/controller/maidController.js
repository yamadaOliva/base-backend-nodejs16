import {
  getMaidList,
  findMaidByLikeName,
  findMaidByPage,
  findMaidByLanguage,
  getMaidbyId,
  filterMaid,
  createProfileMaidService,
  updateProfileMaidService,
  priceFilter,
  ratingFilter,
} from "../service/maidService.js";

const getMaidListController = async (req, res) => {
  try {
    if (req.query.page == undefined || req.query.limit == undefined) {
      const maidList = await getMaidList();
      return res.status(200).json(maidList);
    }
    const maidList = await findMaidByPage(+req.query.page, +req.query.limit);
    return res.status(200).json(maidList);
  } catch (error) {
    console.log(error);
  }
};

const findMaidByLikeNameController = async (req, res) => {
  const name = req.query.name;
  const page = req.query.page;
  const limit = req.query.limit;
  console.log("name controller ==>", name);
  try {
    const maidList = await findMaidByLikeName(name, page, limit);
    console.log("maidList controller ==>", maidList);
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

const filterMaidController = async (req, res) => {
  const page = +req.query.page;
  const limit = +req.query.limit;
  try {
    const maidList = await filterMaid(req.query.filterField, page, limit);
    return res.status(200).json(maidList);
  } catch (error) {
    console.log(error);
  }
};

const createProfileMaidController = async (req, res) => {
  const maid = req.body;
  try {
    const maidList = await createProfileMaidService(maid);
    return res.status(200).json(maidList);
  } catch (error) {
    console.log(error);
  }
};

const updateProfileMaidController = async (req, res) => {
  const maid = req.body;
  try {
    const maidList = await updateProfileMaidService(maid);
    return res.status(200).json(maidList);
  } catch (error) {
    console.log(error);
  }
};

const priceFilterController = async (req, res) => {
  const page = +req.query.page;
  const limit = +req.query.limit;
  try {
    const maidList = await priceFilter(page, limit);
    return res.status(200).json(maidList);
  } catch (error) {
    console.log(error);
  }
};

const ratingFilterController = async (req, res) => {
  const page = +req.query.page;
  const limit = +req.query.limit;
  try {
    const maidList = await ratingFilter(page, limit);
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
  filterMaidController,
  createProfileMaidController,
  updateProfileMaidController,
  priceFilterController,
  ratingFilterController,
};
