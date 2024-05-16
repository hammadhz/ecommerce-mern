const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/genToken");

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
    const findUser = await User.findOne({ email: email });
    console.log(findUser);
    if (findUser) {
      const isPasswordMatch = await bcrypt.compare(password, findUser.password);
      if (isPasswordMatch) {
        const generatedToken = await generateToken(findUser._id);
        return {
          message: "Login Successfully",
          success: true,
          token: generatedToken,
        };
      } else {
        throw new Error("Invalid Credentails");
      }
    } else {
      throw new Error("User Not Exists!");
    }
  } catch (error) {
    throw new Error(error);
  }
});

const getAllUsersService = asyncHandler(async () => {
  try {
    const getAllUser = await User.find();
    if (getAllUser.length > 0)
      return {
        message: "Successfully get all users!",
        success: true,
        usersList: getAllUser,
      };
    else
      return {
        message: "No User Record!",
        success: false,
      };
  } catch (error) {
    throw new Error(error);
  }
});

const getUserService = asyncHandler(async (id) => {
  try {
    const getUser = await User.findById(id);
    if (getUser)
      return {
        message: "Successfully get user!",
        success: true,
        user: getUser,
      };
    else
      return {
        message: "User Not Found!",
        success: false,
      };
  } catch (error) {
    throw new Error(error);
  }
});

const deleteUserService = asyncHandler(async (id) => {
  try {
    await User.findByIdAndDelete(id);
    return {
      message: "Successfully user deleted!",
      success: true,
    };
  } catch (error) {
    throw new Error(error);
  }
});

const updateUserService = asyncHandler(async (id, body) => {
  try {
    let updateData = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      mobile: body.mobile,
    };
    const updateUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    return { message: "User Updated Successfully!", success: true };
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUserService,
  loginService,
  getAllUsersService,
  getUserService,
  deleteUserService,
  updateUserService,
};
