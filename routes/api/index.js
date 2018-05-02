const router = require("express").Router();
const authRoutes = require("./Auth/");
const docRoutes = require("./Doctor");
const paymentRoutes = require("./Payment");
const serviceRoutes = require("./Service");
const questionRoutes = require("./Question");
const commentRoutes = require("./Comment");
const newsRoutes = require("./News");
const socketRoutes = require("./Socket");

router.use("/auth", authRoutes);
router.use("/doctor", docRoutes);
router.use("/payment", paymentRoutes);
router.use("/service", serviceRoutes);
router.use("/question", questionRoutes);
router.use("/comment", commentRoutes);
router.use("/news", newsRoutes);
router.use("/socket", socketRoutes);


module.exports = router;