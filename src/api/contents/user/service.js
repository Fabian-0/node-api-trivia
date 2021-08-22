const User = require("./model");
const bcrypt = require("bcrypt");
const { createToken } = require("../../services/helper");

async function authUser(req, res) {
  try {
    const { email, password } = req.body;
    const isUser = await User.findOne({where: {email}, raw: true});
    
    if(isUser) {

      const isPassword = await bcrypt.compareSync(password, isUser.password);

      if(isPassword) {

        delete isUser.password;
        delete isUser.email;
        const token = createToken(isUser);

        res.status(200);
        res.json({
          "token": token
        });

      } else {

        res.status(400);
        res.json({
          "message": "",
          "error": "wrong credentials"
        });

      }

    } else {

      res.status(400);
      res.json({
        "message": "",
        "error": "wrong credentials"
      });

    }

  } catch (error) {

    res.status(400);
    res.json({
      "message": "",
      "error": error.message
    });

    console.error("<<<<<<<<<<< Error Auth User >>>>>>>>>>>", error.message);

  }

  return;
};

module.exports = {
  authUser,
}