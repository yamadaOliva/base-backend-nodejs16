import bcrypt from "bcryptjs";
import db from "../models/index.js";
import JWTmiddleware from "../middleware/JWTmiddleware.js";
//hash password
const salt = bcrypt.genSaltSync(10);
const hashPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};

const checkUserExists = async (email) => {
  const user = await db.User.findOne({
    where: {
      email: email,
    },
  });
  return user ? true : false;
};

const registerService = async (user) => {
  console.log("service==>", user);
  const userIsExists = await checkUserExists(user.email);
  console.log("userIsExists==>", userIsExists);
  if (userIsExists) {
    return {
      EC: 400,
      EM: "Email is already exists",
      DT: "",
    };
  } else {
    try {
      await db.User.create({
        email: user.email,
        password: hashPassword(user.password),
        username: user.username,
        role: user.role,
        name: user.name,
        active: true,
      });
      return {
        EC: 200,
        EM: "Register successfully",
        DT: "",
      };
    } catch (error) {
      console.log(error);
    }
  }
};

const loginService = async (user) => {
  const userIsExists = await checkUserExists(user.email);
  if (!userIsExists) {
    return {
      EC: -1,
      EM: "Password or email is not correct",
      DT: "",
    };
  } else {
    const userTemp = await db.User.findOne({
      where: {
        email: user.email,
      },
    });

    const isMatch = bcrypt.compareSync(user.password, userTemp.password);
    if (!isMatch) {
      return {
        EC: -1,
        EM: "Password or email is not correct",
        DT: "",
      };
    } else {
      let token = JWTmiddleware.createToken(user);
      return {
        EC: 200,
        EM: "Login successfully",
        DT: {
          accessToken: token,
          email: userTemp.email,
          username: userTemp.username,
          role: userTemp.role,
          id: userTemp.id,
          active: userTemp.active,
        },
      };
    }
  }
};

const reLoginService = (token) => {
  const data = JWTmiddleware.verifyToken(token);
  const res = loginService(data);
  return res;
};

const a1 = async () => {
  const count = await db.User.count({
    where: {
      active: "false",
      role: 1,
    },
  });
  return count;
};

const a2 = async () => {
  const count = await db.User.count({
    where: {
      active: "false",
      role: 2,
    },
  });
  return count;
};
const blockedService = async (id) => {
  try {
    const user = await db.User.update(
      {
        active: false,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return {
      EC: 200,
      EM: "Blocked successfully",
      DT: user,
    };
  } catch (error) {
    console.log(error);
  }
};

const unblockedService = async (id) => {
  console.log("id==>", id);
  try {
    const user = await db.User.update(
      {
        active: true,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return {
      EC: 200,
      EM: "Unblocked successfully",
      DT: user,
    };
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  registerService,
  loginService,
  reLoginService,
  a1,
  a2,
  blockedService,
  unblockedService,
};
