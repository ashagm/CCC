const router = require("express").Router();
const paymentRoutes = require("./payment");

router.use("/", paymentRoutes);

module.exports = router;