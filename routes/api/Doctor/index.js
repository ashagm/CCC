const router = require("express").Router();
const doctorRoutes = require("./doctor");

router.use("/", doctorRoutes);

module.exports = router;