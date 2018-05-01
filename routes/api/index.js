const router = require("express").Router();
const authRoutes = require("./auth");
const docRoutes = require("./doctor");
const paymentRoutes = require("./payment");
const serviceRoutes = require("./service");
const questionRoutes = require("./question");
const commentRoutes = require("./comment");
const newsRoutes = require("./news");

router.use("/auth", authRoutes);
router.use("/doctor", docRoutes);
router.use("/payment", paymentRoutes);
router.use("/service", serviceRoutes);
router.use("/question", questionRoutes);
router.use("/comment", commentRoutes);
router.use("/news", newsRoutes);


module.exports = router;