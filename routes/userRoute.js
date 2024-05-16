const express = require("express");

const userRouter = express.Router();

const {
  getAllUser,
  getUser,
  deleteUser,
  updateUser,
} = require("../controllers/userCtrl");
const { authMiddleware } = require("../middlewares/authMiddleware");

userRouter.get("/all-user", getAllUser);
userRouter.get("/get-user/:id", authMiddleware, getUser);
userRouter.delete("/delete-user/:id", deleteUser);
userRouter.put("/update-user/:id", updateUser);

module.exports = userRouter;
