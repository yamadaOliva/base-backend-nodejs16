import {
  registerService,
  loginService,
  reLoginService,
  blockedService,
  unblockedService
} from "../service/authService.js";

const registerController = async (req, res) => {
  const user = req.body;
  console.log(req.body);
  try {
    const result = await registerService(user);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

const loginController = async (req, res) => {
  const user = req.body;
  console.log(req.body);
  try {
    const result = await loginService(user);

    res.cookie("token", result.DT.accessToken, {
      httpOnly: false,
      maxAge: 1000 * 60 * 60,
    });
    console.log(result);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

const logoutController = async (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({
    EC: 0,
    EM: "Logout successfully",
    DT: "",
  });
};

const reLoginController = async (req, res) => {
  const token = req.cookies.token;
  try {
    const result = await reLoginService(token);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

const blockedController = async (req, res) => {
  const id = req.query.id;
  try {
    const result = await blockedService(id);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

  const unblockedController = async (req, res) => {
  const id = req.query.id;
  console.log("asfsdfsdf=>",id);
  try {
    const result = await unblockedService(id);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  registerController,
  loginController,
  logoutController,
  reLoginController,
  blockedController,
  unblockedController
};
