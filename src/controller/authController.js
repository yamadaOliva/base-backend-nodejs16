import { registerService, loginService } from "../service/authService.js";

const registerController = async (req, res) => {
  const user = req.body;
  console.log(req.body);
  const result = await registerService(user);
  return res.status(200).json(result);
};

const loginController = async (req, res) => {
  const user = req.body;
  console.log(req.body);
  try {
    const result = await loginService(user);
    console.log(result);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerController,
  loginController,
};
