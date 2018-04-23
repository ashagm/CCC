const router = require("express").Router();
const authRoutes = require("./auth");

router.use("/", authRoutes);

module.exports = router;