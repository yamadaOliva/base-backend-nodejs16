import {
  createRequest,
  updateRequest,
  getListRequest2,
  cancelRequest,
  refuseRequest,
  doneRequest,
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
  const data = req.body;
  try {
    let result;
    switch (data.status) {
      case "cancel":
        result = await cancelRequest(data.data.id, data.data.reason);
        break;
      case "refuse":
        result = await refuseRequest(data.data.id);
        break;
      case "done":
        result = await doneRequest(data.data.id);
        break;
      case "accept":
        result = await updateRequest(data);
        break;
      default:
        result = await updateRequest(data);
        break;
    }

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

const getListRequestController = async (req, res) => {
  const maid_id = req.query.id;
  console.log("maid_id =>", maid_id);
  try {
    const result = await getListRequest2(maid_id);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createRequestController,
  updateRequestController,
  getListRequestController,
};
