const router = require("express").Router();
const authRoutes = require("./auth");
// const registerRoutes = require("./register");
// const loginRoutes = require("./login");
// const logoutRoutes = require("./logout");


router.use("/auth", authRoutes);

// router.use("/register", registerRoutes);
// router.use("/login", loginRoutes);
// router.use("/logout", logoutRoutes);

module.exports = router;