const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

const createUserService = asyncHandler(async (registerParam) => {
  try {
    const { firstName, lastName, email, mobile, password } = registerParam;
    const findUser = await User.find({ email: email });
    if (findUser.lenght > 0) {
      throw new Error("User Already Exits!");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        firstName,
        lastName,
        email,
        mobile,
        password: hashedPassword,
      });
      await user.save();
      return { message: "User Register Successfully", success: true };
    }
  } catch (error) {
    throw new Error(error);
  }
});

const loginService = asyncHandler(async (loginParam) => {
  try {
    const { email, password } = loginParam;
    const findUser = await User.find({ email: email });
    if (findUser.length > 0) {
      const isPasswordMatch = await bcrypt.compare(
        password,
        findUser[0].password
      );
      if (isPasswordMatch)
        return { message: "Login Successfully", success: true };
      else throw new Error("Invalid Credentails");
    } else {
      throw new Error("User Not Exists!");
    }
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUserService,
  loginService,
};
