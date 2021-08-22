const jwt = require("jsonwebtoken");

function validateToken(req, res, next) {
  let token = req.headers["authorization"];

  if(token) {
    
    token = token.replace(/^Bearer\s+/, "");

    jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
      if(error) {
        res.status(400);
        res.json({
          "message": "",
          "error": "Invalid token"
        });
        return;
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(400);
    res.json({
      "message": "",
      "error": "Without token!"
    });
    return;
  }
}

module.exports = {
  validateToken,
}