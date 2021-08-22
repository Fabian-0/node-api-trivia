const User = require("./model");
const { literal } = require("sequelize");
async function updateScore(req, res) {
  try {
    const isUpdate = await User.update({ score: literal(`score + ${req.body.score}`)}, {where: { id: req.decoded.id }});
    if(isUpdate[0]) {
      res.status(200);
      res.json({
        "message": "score updated",
        "error": "", 
      });
    } else {
      res.status(500);
      res.end()
    }
  } catch (error) {
    res.status(400);
    res.json({
      "message": "",
      "error": error.message,
    });
    console.error("<<<<<<<<<<< Error Delete User >>>>>>>>>>>", error.message);
  }
}

module.exports = {
  updateScore,
}