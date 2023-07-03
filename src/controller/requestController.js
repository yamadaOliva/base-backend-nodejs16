import {
  createRequest,
  updateRequest,
  getlistRequest,
  cancelRequest,
} from "../service/requestService";
const createRequestController = async (req, res) => {
  const request = req.body;
  console.log("request =>", request);
  try {
    const result = await createRequest(request);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

const updateRequestController = async (req, res) => {
  const id = req.body;
  try {
    const result = await updateRequest(status, id);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

const getListRequestController = async (req, res) => {
  const maid_id = req.params.id;
  try {
    const result = await getlistRequest(maid_id);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

const cancelRequestController = async (req, res) => {
  const { id, reason } = req.body;
  try {
    const result = await cancelRequest(id, reason);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createRequestController,
  updateRequestController,
  getListRequestController,
  cancelRequestController,
};
