const jwt = require("jsonwebtoken");
const config = require("../config");

const generateToken = (user) => {
  console.log(user);
  return jwt.sign({ id: user._id, roles: user.roles }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
};

module.exports = generateToken;
