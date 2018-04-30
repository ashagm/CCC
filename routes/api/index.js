const router = require("express").Router();
const authRoutes = require("./auth");
const docRoutes = require("./doctor");
const paymentRoutes = require("./payment");
const serviceRoutes = require("./service");

router.use("/auth", authRoutes);
router.use("/doctor", docRoutes);
router.use("/payment", paymentRoutes);
router.use("/service", serviceRoutes);


module.exports = router;