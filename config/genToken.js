const jwt = require("jsonwebtoken");

const generateToken = async (id) => {
  const token = jwt.sign({ id }, process.env.SECRET_JWT, {
    expiresIn: "1h",
  });

  return token;
};

module.exports = { generateToken };
