const router = require("express").Router();

const authRoutes = require("./auth");
router.use("/login", authRoutes);
router.use("/register", authRoutes);

module.exports = router;