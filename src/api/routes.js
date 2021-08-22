const { Router } = require("express");
const router = Router();
const userRoutes = require("./contents/user/routes");

router.use("/user/", userRoutes);

module.exports = router;