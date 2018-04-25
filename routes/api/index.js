const router = require("express").Router();
const authRoutes = require("./auth");
const docRoutes = require("./doctor");
const paymentRoutes = require("./payment");

router.use("/auth", authRoutes);
router.use("/doctor", docRoutes);
router.use("/payment", paymentRoutes);


module.exports = router;