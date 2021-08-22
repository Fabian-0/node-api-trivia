const jwt = require("jsonwebtoken");

function createToken(data) {
  try {
    const token = jwt.sign(data, process.env.JWT_KEY, {
      expiresIn: "24h",
      algorithm: "HS512"
    });
    return token;
  } catch (error) {
    return error;
  }
}

module.exports = {
  createToken,
}