import db from "../models/index";

const createRequest = async (request) => {
  //convert string to datetime
  const SD = new Date(
    request.start_date.year,
    request.start_date.month-1,
    request.start_date.day,
    request.start_date.hour,
    request.start_date.minute
  );
  const ED = new Date(
    request.end_date.year,
    request.end_date.month-1,
    request.end_date.day,
    request.end_date.hour,
    request.end_date.minute
  );
  console.log("request =>", SD, ED);
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
    });
    console.log("Create request successfully");
    return {
      EC: 200,
      EM: "Create request successfully",
      DT: "",
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createRequest,
};
