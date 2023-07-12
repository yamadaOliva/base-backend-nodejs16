import db from "../models/index";
import { getReviewsByID } from "./reviewService";
const checkRequestIsExist = async (userId, MaidId) => {
  console.log("checkRequestIsExist", userId, MaidId);
  try {
    const request = await db.Booking.findAll({
      where: {
        user_id: userId,
        booking_id: MaidId,
      },
    });
    if (!request) return false;
    let isExist = false;
    request.forEach((item) => {
      //convert to js obj;
      item = item.get({ plain: true });
      if (item.status == "pending") {
        isExist = true;
      }
    });
    return isExist;
  } catch (error) {
    console.log(error);
  }
};
const createRequest = async (request) => {
  const isExist = await checkRequestIsExist(request.user_id, request.maid_id);
  console.log("isExist", isExist);
  if (isExist) {
    return {
      EC: 400,
      EM: "Wait for maid accept your request",
      DT: "",
    };
  }
  //convert string to datetime
  const SD = new Date(
    request.start_date.year,
    request.start_date.month - 1,
    request.start_date.day,
    request.start_date.hour,
    request.start_date.minute
  );
  const ED = new Date(
    request.end_date.year,
    request.end_date.month - 1,
    request.end_date.day,
    request.end_date.hour,
    request.end_date.minute
  );
  const formattedStartDate = SD.toISOString().slice(0, 19).replace("T", " ");
  const formattedEndDate = ED.toISOString().slice(0, 19).replace("T", " ");
  console.log("request =>", formattedStartDate, formattedEndDate);
  try {
    await db.Booking.create({
      user_id: request.user_id,
      booking_id: request.maid_id,
      start_date: formattedStartDate,
      end_date: formattedEndDate,
      price: request.price,
      status: request.status,
      cancel_reason: request.cancel_reason,
      address: request.address,
    });
    return {
      EC: 200,
      EM: "Create request successfully",
      DT: "",
    };
  } catch (error) {
    console.log(error);
  }
};

const getListRequest2 = async (user_id) => {
  try {
    const listRequest = await db.Booking.findAll({
      where: {
        booking_id: user_id,
      },
      include: {
        model: db.User,
        attributes: ["username"],
      },
    });
    return {
      EC: 200,
      EM: "Get list request successfully",
      DT: listRequest,
    };
  } catch (error) {
    console.log(error);
  }
};

const updateRequest = async (id) => {
  try {
    await db.Booking.update(
      {
        status: "Accepted",
      },
      {
        where: {
          id: id,
        },
      }
    );
    return {
      EC: 200,
      EM: "Update request successfully",
      DT: "",
    };
  } catch (error) {
    console.log(error);
  }
};

const cancelRequest = async (id, reason) => {
  try {
    await db.Booking.update(
      {
        status: "Canceled",
        cancel_reason: reason,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return {
      EC: 200,
      EM: "Cancel request successfully",
      DT: "",
    };
  } catch (error) {
    console.log(error);
  }
};

const refuseRequest = async (id) => {
  try {
    await db.Booking.update(
      {
        status: "Refused",
      },
      {
        where: {
          id: id,
        },
      }
    );
    return {
      EC: 200,
      EM: "Refuse request successfully",
      DT: "",
    };
  } catch (error) {
    console.log(error);
  }
};

const doneRequest = async (id) => {
  try {
    await db.Booking.update(
      {
        status: "Done",
      },
      {
        where: {
          id: id,
        },
      }
    );
    return {
      EC: 200,
      EM: "Done request successfully",
      DT: "",
    };
  } catch (error) {
    console.log(error);
  }
};

const deleteRequest = async (id) => {
  console.log("deleteRequest", id);
  try {
    await db.Booking.destroy({
      where: {
        id: id,
      },
    });
    return {
      EC: 200,
      EM: "Delete request successfully",
      DT: "",
    };
  } catch (error) {
    console.log(error);
  }
};

const getAverageRating = async (maid_id) => {
  try {
    const ListReview = await getReviewsByID(maid_id);
    let totalRating = 0;
    ListReview.forEach((item) => {
      item = item.get({ plain: true });
      totalRating += item.rating;
    });
    const averageRating = totalRating / ListReview.length;
    // sum of done request in this month
    const doneRequest = await db.Booking.findAll({
      where: {
        booking_id: maid_id,
        status: "Done",
      },
      include: {
        model: db.User,
        attributes: ["username"],
      },
    });

    return {
      EC: 200,
      EM: "Get average rating successfully",
      DT: {
        averageRating: averageRating,
        doneRequest: doneRequest,
        ListReview: ListReview,
      },
    };
  } catch (error) {
    console.log(error);
  }
};

const getRequestByUserId = async (user_id) => {
  try {
    const listRequest = await db.Booking.findAll({
      where: {
        user_id: user_id,
      },
      include: {
        model: db.Maid_profile,
      },
    });
    return {
      EC: 200,
      EM: "Get list request successfully",
      DT: listRequest,
    };
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  createRequest,
  getListRequest2,
  updateRequest,
  cancelRequest,
  refuseRequest,
  doneRequest,
  deleteRequest,
  getAverageRating,
  getRequestByUserId,
};
