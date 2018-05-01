const router = require("express").Router();
const authRoutes = require("./auth");
const docRoutes = require("./doctor");
const paymentRoutes = require("./payment");
const serviceRoutes = require("./service");
const questionRoutes = require("./question");
const commentRoutes = require("./comment");

router.use("/auth", authRoutes);
router.use("/doctor", docRoutes);
router.use("/payment", paymentRoutes);
router.use("/service", serviceRoutes);
router.use("/question", questionRoutes);
router.use("/comment", commentRoutes);


module.exports = router;