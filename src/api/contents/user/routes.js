const { Router } = require("express");
const router = Router();
const { validateToken } = require("../../middleware/auth");
const { getUser, createUser, updateUser, deleteUser } = require("./controller");
const { authUser } = require("./service");
const { updateScore } = require("./score.controller");

router.get("/", validateToken, getUser);
router.post("/", createUser);
router.put("/", validateToken, updateUser);
router.delete("/", validateToken, deleteUser);

router.post("/signin", authUser);
router.put("/score", validateToken, updateScore);

module.exports = router;