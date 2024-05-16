const {
  createUserService,
  loginService,
  getAllUsersService,
  getUserService,
  deleteUserService,
  updateUserService,
} = require("../services/userService");

const createUser = async (req, res) => {
  try {
    const createSerRes = await createUserService(req.body);
    res.json(createSerRes);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const loginSerRes = await loginService(req.body);
    res.json(loginSerRes);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getAllUser = async (req, res) => {
  try {
    const getAllUserRes = await getAllUsersService();
    res.json(getAllUserRes);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const getUserRes = await getUserService(id);
    res.json(getUserRes);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUserRes = await deleteUserService(id);
    res.json(deleteUserRes);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateUserRes = await updateUserService(id, req.body);
    res.json(updateUserRes);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = {
  createUser,
  login,
  getAllUser,
  getUser,
  deleteUser,
  updateUser,
};
