const User = require("./model");
const { createToken } = require("../../services/helper");

async function getUser(req, res) {
  try {
    const isUser = await User.findOne({ where: {id: req.decoded.id} ,raw: true });
    if(isUser) {
      res.status(200);
      res.json({
        "message": "user found",
        "error": "",
        "data": isUser
      });
    } else {
      res.status(500);
      res.end();
    }
  } catch (error) {
    res.status(400);
    res.json({
      "message": "",
      "error": "Unexpected error"
    });
    console.error("<<<<<<<<<<< Error Get User >>>>>>>>>>>", error.message);
  }
  return;
};

async function createUser(req, res) {
  try {
    const { username, email, password } = req.body;
    const newUser = await User.create({ username, email, password }, { raw: true });
    const payloadToken = newUser.dataValues;

    delete payloadToken.password;
    delete payloadToken.email;
    console.log();
    const token = createToken(payloadToken);
    console.log(token);
    console.log(payloadToken);
    console.log(newUser);
    res.status(201);
    res.json({
      "message": "user created",
      "error": "",
      "token": token
    });
  } catch (error) {
    res.status(400);
    res.json({
      "message": "",
      "error": error.message
    });
    console.error("<<<<<<<<<<< Error Create User >>>>>>>>>>>", error.message);
  }
  return;
};

async function updateUser(req, res) {
  try {
    if(req.body.score) delete req.body.score;
    const isUpdate = await User.update(req.body, {where: {id: req.decoded.id}});
    if(isUpdate[0]) {
      res.status(200);
      res.json({
        "message": "user updated",
        "error": "",
      });
    } else {
      res.status(400);
      res.json({
        "message": "",
        "error": "wrong field",
      });
    }
  } catch (error) {
    res.status(400);
    res.json({
      "message": "",
      "error": error.message
    });
    console.error("<<<<<<<<<<< Error Update User >>>>>>>>>>>", error.message);
  }
  return;
}

async function deleteUser(req, res) {
  try {
    const isDeleted = await User.destroy({where: { id: req.decoded.id }});
    if(isDeleted) {
      res.status(204);
      res.end();
    } else {
      res.status(500);
      res.end();
    }
  } catch (error) {
    res.status(400);
    res.json({
      "message": "",
      "error": "Unexpected error"
    });
    console.error("<<<<<<<<<<< Error Delete User >>>>>>>>>>>", error.message);
  }
  return;
};

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
}