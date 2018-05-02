const router = require("express").Router();
const authRoutes = require("./auth.js");

router.use("/", authRoutes);

module.exports = router;